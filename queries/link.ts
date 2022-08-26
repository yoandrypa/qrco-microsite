import { Link as LinkModel } from "../models";
import dynamoose from "../libs/dynamoose";
// @ts-ignore
import bcrypt from "bcryptjs";

interface TotalParams {
  search?: string;
}

export const total = async (
  match: Match<LinkQueryType>,
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

export const get = async (match: Partial<LinkQueryType>, params: GetParams) => {
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
  const links: LinkJoinedDomainType[] = results;

  return [links, results.count];
};

export const find = async (match: Partial<LinkQueryType>): Promise<LinkType> => {
  return await LinkModel.findOne(match);
};

interface Create extends Partial<LinkType> {
  address: string;
  target: string;
}

export const create = async (params: Create) => {
  let encryptedPassword: string = "";

  if (params.password) {
    const salt = await bcrypt.genSalt(12);
    encryptedPassword = await bcrypt.hash(params.password, salt);
  }

  return await LinkModel.create({
    password: encryptedPassword,
    domain_id: params.domain_id || null,
    user_id: params.user_id,
    address: params.address,
    description: params.description || null,
    expire_in: params.expire_in || null,
    target: params.target
  });
};
