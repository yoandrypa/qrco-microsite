import { LinkModel as LinkModel } from "../models/link";
import dynamoose from "../libs/dynamoose";
// @ts-ignore
import bcrypt from "bcryptjs";
import { CustomError } from "../utils";

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
  address: string | undefined;
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
    domainId: params.domainId,
    userId: params.userId,
    address: params.address,
    description: params.description,
    expireIn: params.expireIn,
    target: params.target,
    type: params.type
  });
};

export const remove = async (match: Partial<LinkType>) => {
  try {
    const link = await LinkModel.findOne({
      id: { eq: match.id },
      userId: { eq: match.userId }
    });

    if (!link) {
      throw new CustomError("LinkModel was not found.");
    }

    const deletedLink = await link.delete();

    return !deletedLink;
  } catch (e) {
    // @ts-ignore
    throw new CustomError(e.message);
  }
};

export const batchUpdate = async (
  match: string | Partial<LinkType>,
  data: Partial<LinkType>
) => {
  try {
    const links = await LinkModel.scan(match).exec();
    links.forEach(link => {
      update(link.id, data);
    });
    return true;
  } catch (e) {
    // @ts-ignore
    throw new CustomError(e.message);
  }
};

export const batchRemove = async (match: Match<LinkQueryType>) => {
  await LinkModel.batchDeletes(match); //deleteQuery.delete();
};

export const update = async (match: string | Partial<LinkType>, update: Partial<LinkType>
) => {
  // @ts-ignore
  return await LinkModel.update(match, {
    ...update
  });
};

export const increamentVisit = async (match: Partial<LinkQueryType>) => {
  try {
    let link = await find(match);
    if (!link) {
      throw new CustomError("LinkModel was not found.");
    }
    const visitCount = link.visitCount + 1;
    // @ts-ignore
    link = await update(link.id, { visitCount });
    return link.visitCount;
  } catch (e) {
    // @ts-ignore
    throw new CustomError(e.message);
  }
};
