import * as utils from "../utils";
import * as validators from "./validators";
import queries from "../queries";
import URL from "url";
import { CreateLinkData } from "./types";
import { CustomError } from "../utils";
import next from "next";
import { IncomingMessage, ServerResponse } from "http";
import { BaseNextRequest, BaseNextResponse } from "next/dist/server/base-http";
import isbot from "isbot";

interface Query {
  user_id: string;
  link?: any;
  limit?: any;
  skip?: any;
  search?: any;
  all?: any;
}

export const create = async (data: CreateLinkData) => {
  try {
    const {
      reuse,
      password,
      customurl,
      description,
      target,
      domain,
      expire_in
    } = data.body;
    const domain_id = domain ? domain.id : null;

    // @ts-ignore
    const targetDomain = utils.removeWww(URL.parse(target).hostname);

    const queriesBatch = await Promise.all([
      validators.coolDown(data.user),
      validators.malware(data.user, target),
      validators.linksCount(data.user),
      reuse &&
      queries.link.find({
        target: { eq: target },
        user_id: { eq: data.user.id },
        domain_id: { eq: domain_id }
      }),
      customurl &&
      queries.link.find({
        address: { eq: customurl },
        domain_id: { eq: domain_id }
      }),
      !customurl && utils.generateId(domain_id),
      validators.bannedDomain(targetDomain),
      validators.bannedHost(targetDomain)
    ]);

    // if "reuse" is true, try to return
    // the existent URL without creating one
    if (queriesBatch[3]) {
      return utils.sanitize.link(queriesBatch[3]);
    }

    // Check if custom link already exists
    if (queriesBatch[4]) {
      throw new CustomError("Custom URL is already in use.");
    }

    // Create new link
    const address = customurl || queriesBatch[5];
    const link = await queries.link.create({
      password,
      address,
      domain_id,
      description,
      target,
      expire_in,
      user_id: data.user.id
    });

    if (!data.user && process.env.REACT_APP_NON_USER_COOLDOWN) {
      await queries.ip.add(data.realIP);
    }

    // @ts-ignore
    return utils.sanitize.link({ ...link, domain: domain?.address });
  } catch (e) {
    return e;
  }
};

export const list = async (query: Query) => {
  try {
    const { limit, skip, search, all, user_id } = query;

    const match = {
      ...(!all && { user_id: { eq: user_id } })
    };

    // @ts-ignore
    const [links, total] = await queries.link.get(match, { limit, search, skip });

    const data = links.map(utils.sanitize.link);

    return {
      total,
      limit,
      skip,
      data
    };
  } catch (e) {
    throw e;
  }
};

export const get = async (address: string) => {
  const link = await queries.link.find({ address: { eq: address } });
  return utils.sanitize.link(link);
};

/*export const redirect = (app: ReturnType<typeof next>) => async (
  req: BaseNextRequest<any> | IncomingMessage,
  res: BaseNextResponse<any> | ServerResponse,
  next: () => any
) => {
  try {
    const isBot = isbot(req.headers["user-agent"]);
    const isPreservedUrl = validators.preservedUrls.some(
      item => {
        // @ts-ignore
        const path = new URL(req.url).pathname
        return item === path.replace("/", "");
      }
    );

    if (isPreservedUrl) return next();

    // 1. If custom domain, get domain info
    const host = utils.removeWww(req.headers.host);
    const domain =
      host !== process.env.REACT_APP_DEFAULT_DOMAIN
        ? await queries.domain.find({ address: { eq: host } })
        : null;

    // 2. Get link
    const address = req.params.id.replace("+", "");
    const match = {
      address: { eq: address }
    };
    if (domain) {
      // @ts-ignore
      match["domain_id"] = { eq: domain.id };
    }
    const link = await queries.link.find(match);

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
    /!*if (link.user_id && !isBot) {
      queue.visit.add({
        headers: req.headers,
        realIP: req.realIP,
        referrer: req.get("Referrer"),
        link
      });
    }*!/

    // 8. Create Google Analytics visit
    if (env.REACT_GOOGLE_ANALYTICS_UNIVERSAL && !isBot) {
      ua(env.REACT_GOOGLE_ANALYTICS_UNIVERSAL)
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
};*/
