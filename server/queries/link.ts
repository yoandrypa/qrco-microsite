import bcrypt from "bcryptjs";

import { CustomError } from "../utils";
//import * as redis from "../redis";
import { Link as LinkModel } from "../models";
import dynamoose from "../libs/dynamoose";

/*const selectable = [
    "links.id",
    "links.address",
    "links.banned",
    "links.created_at",
    "links.domain_id",
    "links.updated_at",
    "links.password",
    "links.description",
    "links.expire_in",
    "links.target",
    "links.visit_count",
    "links.user_id",
    "links.uuid",
    "domains.address as domain"
];

const normalizeMatch = (match: Partial<Link>): Partial<Link> => {
    const newMatch = {...match};

    if (newMatch.address) {
        newMatch["links.address"] = newMatch.address;
        delete newMatch.address;
    }

    if (newMatch.user_id) {
        newMatch["links.user_id"] = newMatch.user_id;
        delete newMatch.user_id;
    }

    if (newMatch.uuid) {
        newMatch["links.uuid"] = newMatch.uuid;
        delete newMatch.uuid;
    }

    return newMatch;
};*/

interface TotalParams {
  search?: string;
}

export const total = async (
  match: Match<LinkQuery>,
  params: TotalParams = {}
) => {
  const query = LinkModel.scan(match);

  if (params.search) {
    query.and().parenthesis(
      new dynamoose.Condition()
        .where("description")
        .contains(params.search)
        .or()
        .where("address")
        .contains(params.search)
        .or()
        .where("target")
        .contains(params.search)
    );
  }

  const result = await query.count().exec();

  return typeof result.count === "number"
    ? result.count
    : parseInt(result.count);
};

interface GetParams {
  limit: number;
  search?: string;
  skip: number;
}

export const get = async (match: Partial<LinkQuery>, params: GetParams) => {
  //TODO include the Skip param
  const query = LinkModel.scan(match);

  if (params.search) {
    query.and().parenthesis(
      new dynamoose.Condition()
        .where("description")
        .contains(params.search)
        .or()
        .where("address")
        .contains(params.search)
        .or()
        .where("target")
        .contains(params.search)
    );
  }

  const results = await query.limit(params.limit || 10).exec();
  const links: LinkJoinedDomain[] = results;

  return [links, results.count];
};

export const find = async (match: Partial<LinkQuery>): Promise<Link> => {
  /*if (match.address && match.domain_id) {
    const key = redis.key.link(match.address, match.domain_id);
    const cachedLink = await redis.get(key);
    if (cachedLink) return JSON.parse(cachedLink);
  }*/

  const link = await LinkModel.findOne(match);

  /*if (link) {
    const key = redis.key.link(link.address, link.domain_id);
    redis.set(key, JSON.stringify(link), "EX", 60 * 60 * 2);
  }*/

  return link;
};

interface Create extends Partial<Link> {
  address: string;
  target: string;
}

export const create = async (params: Create) => {
  let encryptedPassword: string = null;

  if (params.password) {
    const salt = await bcrypt.genSalt(12);
    encryptedPassword = await bcrypt.hash(params.password, salt);
  }

  const link: LinkJoinedDomain = await LinkModel.create({
    password: encryptedPassword,
    domain_id: params.domain_id || null,
    user_id: params.user_id || "1234",
    address: params.address,
    description: params.description || null,
    expire_in: params.expire_in || null,
    target: params.target
  });

  return link;
};

export const remove = async (match: Partial<Link>) => {
  try {
    const link = await LinkModel.findOne({
      id: { eq: match.id },
      user_id: { eq: match.user_id }
    });

    if (!link) {
      throw new CustomError("Link was not found.");
    }

    //redis.remove.link(link);

    const deletedLink = await LinkModel.delete(match);

    return !deletedLink;
  } catch (e) {
    throw new CustomError(e.message);
  }
};

export const batchUpdate = async (
  match: string | Partial<Link>,
  data: Partial<Link>
) => {
  try {
    const links = await LinkModel.scan(match).exec();
    links.forEach(link => {
      update(link.id, data);
    });
    return true;
  } catch (e) {
    throw new CustomError(e.message);
  }
};

export const batchRemove = async (match: Match<LinkQuery>) => {
  await LinkModel.batchDeletes(match); //deleteQuery.delete();
};

export const update = async (
  match: string | Partial<Link>,
  update: Partial<Link>
) => {
  const links = [
    await LinkModel.update(match, {
      ...update,
      updated_at: new Date().toISOString()
    })
  ];

  //links.forEach(redis.remove.link);

  return links;
};

export const increamentVisit = async (match: Partial<LinkQuery>) => {
  try {
    let link = await find(match);
    if (!link) {
      throw new CustomError("Link was not found.");
    }
    const visit_count = link.visit_count + 1;
    link = await update(link.id, { visit_count })[0];
    return link.visit_count;
  } catch (e) {
    throw new CustomError(e.message);
  }
};
