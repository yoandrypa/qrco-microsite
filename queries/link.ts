import { Link as LinkModel } from "../models";
import dynamoose from "../libs/dynamoose";
// @ts-ignore
import bcrypt from "bcryptjs";
import { AnyDocument } from "dynamoose/dist/Document";

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
  skip?: number;
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
  let encryptedPassword: string = "";

  if (params.password) {
    const salt = await bcrypt.genSalt(12);
    encryptedPassword = await bcrypt.hash(params.password, salt);
  }

  const link: AnyDocument = await LinkModel.create({
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
