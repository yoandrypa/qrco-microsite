import * as utils from "../utils";
import * as validators from "./validators";
import queries from "../queries";
import URL from "url";
import { CreateLinkData, UpdateLinkData } from "./types";
import { CustomError } from "../utils";
import isbot from "isbot";
import * as DomainHandler from "./domains";
import * as VisitHandler from "../handlers/visit";

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
    const domain_id = domain ? domain.id : "";

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
    ;

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

    const data = await Promise.all(links.map(async (link: LinkJoinedDomainType) => {
      if (link.domain_id) {
        const domain = await DomainHandler.find({ id: link.domain_id });
        link.domain = domain?.address;
      }
      return utils.sanitize.link(link);
    }));

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
  if (!link) {
    return;
  }
  return utils.sanitize.link(link);
};

// @ts-ignore
export const redirect = async (params, req) => {
  try {
    const isBot = isbot(req.headers["user-agent"]);
    /*const isPreservedUrl = validators.preservedUrls.some(
      item => {
        // @ts-ignore
        const path = new URL(req.url).pathname
        return item === path.replace("/", "");
      }
    );

    if (isPreservedUrl) return next();*/ // TODO check this

    // 1. If custom domain, get domain info
    const host = utils.removeWww(req.headers.host);
    const domain =
      host !== process.env.REACT_APP_DEFAULT_DOMAIN
        ? await queries.domain.find({ address: { eq: host } })
        : undefined;

    // 2. Get link
    const address = params.address.replace("+", "");
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
      return domain ? domain.homepage : "/404";
    }

    // 4. If link is banned, return the banned page.
    if (link.banned) {
      return '/banned';
    }

    // 5. If wants to see link info, then redirect
    /*const doesRequestInfo = /.*\+$/gi.test(params.id);
    if (doesRequestInfo && !link.password) {
      return app.render(req, res, "/url-info", { target: link.target });
    }*/ // TODO check this

    // 6. If link is protected, return the password page
    if (link.password) {
      return `/protected/${link.id}`;
    }

    // 7. Create link visit
    if (link.user_id && !isBot) {
      await VisitHandler.add({
        headers: req.headers,
        realIP: params.realIP,
        referrer: req.headers.referer,
        link
      });
    }

    // 8. Create Google Analytics visit
    /*if (proccess.env.REACT_GOOGLE_ANALYTICS_UNIVERSAL && !isBot) {
      ua(env.REACT_GOOGLE_ANALYTICS_UNIVERSAL)
        .pageview({
          dp: `/${address}`,
          ua: req.headers["user-agent"],
          uip: req.realIP,
          aip: 1
        })
        .send();
    }*/

    // 10. Return the target
    return link.target;
  } catch (e) {
    return ;
  }
};

export const edit = async (data: UpdateLinkData) => {
  try {
    const { id, address, target, description, expire_in } = data.body;

    if (!address && !target) {
      throw new CustomError("Should at least update one field.");
    }

    const link = await queries.link.find({
      id: { eq: id },
      user_id: { eq: data.user.id }
    });

    if (!link) {
      throw new CustomError("Link was not found.");
    }

    // @ts-ignore
    const targetDomain = utils.removeWww(URL.parse(target).hostname);
    const domain_id = link.domain_id || null;

    const queriesBatch = await Promise.all([
      validators.coolDown(data.user),
      // @ts-ignore
      validators.malware(data.user, target),
      address !== link.address &&
      queries.link.find({
        address: { eq: address },
        domain_id: { eq: domain_id }
      }),
      validators.bannedDomain(targetDomain),
      validators.bannedHost(targetDomain)
    ]);

    // Check if custom link already exists
    if (queriesBatch[2]) {
      throw new CustomError("Custom URL is already in use.");
    }

    // Update link
    const updatedLink = await queries.link.update(
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

    // @ts-ignore
    return utils.sanitize.link({ ...link, ...updatedLink });
  } catch (e) {
    // @ts-ignore
    throw new CustomError(e.message, 500, e);
  }
};

export const remove = async (params: { id: any; user_id?: any; }) => {
  const link = await queries.link.remove({
    id: params.id,
    user_id: params.user_id
  });

  if (!link) {
    throw new CustomError("Could not delete the link");
  }

  return { message: "Link has been deleted successfully." };
};
