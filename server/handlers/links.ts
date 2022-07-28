import ua from "universal-analytics";
import { Handler } from "express";
import { promisify } from "util";
import bcrypt from "bcryptjs";
import isbot from "isbot";
import next from "next";
import URL from "url";
import dns from "dns";

import * as validators from "./validators";
import { CreateLinkReq } from "./types";
import * as utils from "../utils";
import { CustomError } from "../utils";
import query from "../queries";
import queue from "../queues";
import env from "../env";

const dnsLookup = promisify(dns.lookup);

export const get: Handler = async (req, res) => {
  try {
    const { limit, skip, search, all } = req.query;
    const userId = "1234"; //req.user.id;

    const match = {
      ...(!all && { user_id: { eq: userId } })
    };

    /*const [links, total] = await Promise.all([
            query.link.get(match, {limit, search, skip}),
            query.link.total(match, {search})
        ]);*/
    const [links, total] = await query.link.get(match, { limit, search, skip });

    const data = links.map(utils.sanitize.link);

    return res.send({
      total,
      limit,
      skip,
      data
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const create: Handler = async (req: CreateLinkReq, res) => {
  try {
    const {
      reuse,
      password,
      customurl,
      description,
      target,
      domain,
      expire_in
    } = req.body;
    const domain_id = domain ? domain.id : null;

    const targetDomain = utils.removeWww(URL.parse(target).hostname);

    const queries = await Promise.all([
      validators.cooldown(req.user),
      validators.malware(req.user, target),
      validators.linksCount(req.user),
      reuse &&
        query.link.find({
          target: { eq: target },
          user_id: { eq: "1234" }, //req.user.id,
          domain_id: { eq: domain_id }
        }),
      customurl &&
        query.link.find({
          address: { eq: customurl },
          domain_id: { eq: domain_id }
        }),
      !customurl && utils.generateId(domain_id),
      validators.bannedDomain(targetDomain),
      validators.bannedHost(targetDomain)
    ]);

    // if "reuse" is true, try to return
    // the existent URL without creating one
    if (queries[3]) {
      return res.json(utils.sanitize.link(queries[3]));
    }

    // Check if custom link already exists
    if (queries[4]) {
      throw new CustomError("Custom URL is already in use.");
    }

    // Create new link
    const address = customurl || queries[5];
    const link = await query.link.create({
      password,
      address,
      domain_id,
      description,
      target,
      expire_in,
      user_id: "1234" //req.user.id
    });

    if (!req.user && env.NON_USER_COOLDOWN) {
      query.ip.add(req.realIP);
    }

    /*const link = await Link.create({
            password,
            address,
            domain_id,
            description,
            target,
            expire_in
        })*/

    return res
      .status(201)
      .send(utils.sanitize.link({ ...link, domain: domain?.address }));
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const edit: Handler = async (req, res) => {
  try {
    const { address, target, description, expire_in } = req.body;

    if (!address && !target) {
      throw new CustomError("Should at least update one field.");
    }

    const link = await query.link.find({
      id: { eq: req.params.id },
      user_id: { eq: "1234" }
    });

    if (!link) {
      throw new CustomError("Link was not found.");
    }

    const targetDomain = utils.removeWww(URL.parse(target).hostname);
    const domain_id = link.domain_id || null;

    const queries = await Promise.all([
      validators.cooldown(req.user),
      validators.malware(req.user, target),
      address !== link.address &&
        query.link.find({
          address: { eq: address },
          domain_id: { eq: domain_id }
        }),
      validators.bannedDomain(targetDomain),
      validators.bannedHost(targetDomain)
    ]);

    // Check if custom link already exists
    if (queries[2]) {
      throw new CustomError("Custom URL is already in use.");
    }

    // Update link
    const [updatedLink] = await query.link.update(
      {
        id: link.id
      },
      {
        ...(address && { address }),
        ...(description && { description }),
        ...(target && { target }),
        ...(expire_in && { expire_in })
      }
    );

    return res
      .status(200)
      .send(utils.sanitize.link({ ...link, ...updatedLink }));
  } catch (e) {
    res.status(500).send(e);
  }
};

export const remove: Handler = async (req, res) => {
  const link = await query.link.remove({
    id: req.params.id,
    user_id: "1234"
  });

  if (!link) {
    throw new CustomError("Could not delete the link");
  }

  return res
    .status(200)
    .send({ message: "Link has been deleted successfully." });
};

export const report: Handler = async (req, res) => {
  //TODO
  return res
    .status(200)
    .send({ message: "Thanks for the report, we'll take actions shortly." });
};

export const ban: Handler = async (req, res) => {
  const { id } = req.params;

  const update = {
    banned_by_id: "1234", //req.user.id,
    banned: true
  };

  // 1. Check if link exists
  const link = await query.link.find({ id: { eq: id } });

  if (!link) {
    throw new CustomError("No link has been found.", 400);
  }

  if (link.banned) {
    return res.status(200).send({ message: "Link has been banned already." });
  }

  const tasks = [];

  // 2. Ban link
  tasks.push(query.link.update({ id }, update));

  const domain = utils.removeWww(URL.parse(link.target).hostname);

  // 3. Ban target's domain
  if (req.body.domain) {
    tasks.push(query.domain.add({ ...update, address: domain }));
  }

  // 4. Ban target's host
  if (req.body.host) {
    const dnsRes = await dnsLookup(domain).catch(() => {
      throw new CustomError("Couldn't fetch DNS info.");
    });
    const host = dnsRes?.address;
    tasks.push(query.host.add({ ...update, address: host }));
  } //HERE

  // 5. Ban link owner
  if (req.body.user && link.user_id) {
    tasks.push(query.user.update({ id: "1234" }, update));
  }

  // 6. Ban all of owner's links
  if (req.body.userLinks && link.user_id) {
    tasks.push(query.link.batchUpdate({ user_id: "1234" }, update));
  }

  // 7. Wait for all tasks to finish
  await Promise.all(tasks).catch(e => {
    throw new CustomError("Couldn't ban entries.");
  });
  //TODO Try to use a Dynamo Transaction, change the tasks to return a Promise instead of results...
  /*await dynamoose.transaction(tasks).catch((e) => {
        throw new CustomError("Couldn't ban entries.");
    });*/

  // 8. Send response
  return res.status(200).send({ message: "Banned link successfully." });
};

export const redirect = (app: ReturnType<typeof next>): Handler => async (
  req,
  res,
  next
) => {
  try {
    const isBot = isbot(req.headers["user-agent"]);
    const isPreservedUrl = validators.preservedUrls.some(
      item => item === req.path.replace("/", "")
    );

    if (isPreservedUrl) return next();

    // 1. If custom domain, get domain info
    const host = utils.removeWww(req.headers.host);
    const domain =
      host !== env.DEFAULT_DOMAIN
        ? await query.domain.find({ address: { eq: host } })
        : null;

    // 2. Get link
    const address = req.params.id.replace("+", "");
    const match = {
      address: { eq: address }
    };
    if (domain) {
      match["domain_id"] = { eq: domain.id };
    }
    const link = await query.link.find(match);

    // 3. When no link, if has domain redirect to domain's homepage
    // otherwise redirect to 404
    if (!link) {
      return res.redirect(301, domain ? domain.homepage : "/404");
    }

    // 4. If link is banned, redirect to banned page.
    if (link.banned) {
      return res.redirect("/banned");
    }

    // 5. If wants to see link info, then redirect
    const doesRequestInfo = /.*\+$/gi.test(req.params.id);
    if (doesRequestInfo && !link.password) {
      return app.render(req, res, "/url-info", { target: link.target });
    }

    // 6. If link is protected, redirect to password page
    if (link.password) {
      return res.redirect(`/protected/${link.id}`);
    }

    // 7. Create link visit
    if (link.user_id && !isBot) {
      queue.visit.add({
        headers: req.headers,
        realIP: req.realIP,
        referrer: req.get("Referrer"),
        link
      });
    }

    // 8. Create Google Analytics visit
    if (env.GOOGLE_ANALYTICS_UNIVERSAL && !isBot) {
      ua(env.GOOGLE_ANALYTICS_UNIVERSAL)
        .pageview({
          dp: `/${address}`,
          ua: req.headers["user-agent"],
          uip: req.realIP,
          aip: 1
        })
        .send();
    }

    // 10. Redirect to target
    return res.redirect(link.target);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const redirectProtected: Handler = async (req, res) => {
  // 1. Get link
  const uuid = req.params.id;
  const link = await query.link.find({ id: { eq: uuid } });

  // 2. Throw error if no link
  if (!link || !link.password) {
    throw new CustomError("Couldn't find the link.", 400);
  }

  // 3. Check if password matches
  const matches = await bcrypt.compare(req.body.password, link.password);

  if (!matches) {
    throw new CustomError("Password is not correct.", 401);
  }

  // 4. Create visit
  if (link.user_id) {
    queue.visit.add({
      headers: req.headers,
      realIP: req.realIP,
      referrer: req.get("Referrer"),
      link
    });
  }

  // 5. Create Google Analytics visit
  if (env.GOOGLE_ANALYTICS_UNIVERSAL) {
    ua(env.GOOGLE_ANALYTICS_UNIVERSAL)
      .pageview({
        dp: `/${link.address}`,
        ua: req.headers["user-agent"],
        uip: req.realIP,
        aip: 1
      })
      .send();
  }

  // 6. Send target
  return res.status(200).send({ target: link.target });
};

export const redirectCustomDomain: Handler = async (req, res, next) => {
  const { path } = req;
  const host = utils.removeWww(req.headers.host);

  if (host === env.DEFAULT_DOMAIN) {
    return next();
  }

  if (
    path === "/" ||
    validators.preservedUrls
      .filter(l => l !== "url-password")
      .some(item => item === path.replace("/", ""))
  ) {
    const domain = await query.domain.find({ address: { eq: host } });
    const redirectURL = domain
      ? domain.homepage
      : `https://${env.DEFAULT_DOMAIN + path}`;

    return res.redirect(301, redirectURL);
  }

  return next();
};

export const stats: Handler = async (req, res) => {
  //const { user } = req;
  const uuid = req.params.id;

  const link = await query.link.find({
    user_id: { eq: "1234" },
    id: { eq: uuid }
  });

  if (!link) {
    throw new CustomError("Link could not be found.");
  }

  const stats = await query.visit.find({ link_id: link.id }, link.visit_count);

  if (!stats) {
    throw new CustomError("Could not get the short link stats.");
  }

  return res.status(200).send({
    ...stats,
    ...utils.sanitize.link(link)
  });
};
