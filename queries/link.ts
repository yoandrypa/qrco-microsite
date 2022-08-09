import { Link as LinkModel } from "../models";
import dynamoose from "../libs/dynamoose";

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
