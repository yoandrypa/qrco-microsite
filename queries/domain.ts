import { Domain as DomainModel } from "../models";
import { AnyDocument } from "dynamoose/dist/Document";
import { ScanResponse } from "dynamoose/dist/DocumentRetriever";
import { CustomError } from "../utils";

export const find = async (match: Partial<DomainQueryType>): Promise<DomainType> => {
  return await DomainModel.findOne(match);
};

export const get = async (match: Partial<DomainQueryType>): Promise<ScanResponse<AnyDocument>> => {
  return await DomainModel.scan(match).exec();
};

interface Add extends Partial<DomainType> {
  address: string;
}

export const add = async (params: Add) => {
  params.address = params.address.toLowerCase();

  const exists = await DomainModel.findOne({ address: { eq: params.address } });

  const newDomain = {
    address: params.address,
    homepage: params.homepage || undefined,
    user_id: params.user_id || "1234",
    banned: !!params.banned
  };

  let domain: DomainType;
  if (exists) {
    // @ts-ignore
    domain = await DomainModel.update(exists.id, {
      ...newDomain,
      updated_at: params.updated_at || new Date().toISOString()
    });
  } else {
    // @ts-ignore
    domain = await DomainModel.create(newDomain);
  }

  return domain;
};

export const update = async (
  match: Partial<DomainQueryType>,
  update: Partial<DomainType>
) => {
  const domain = await DomainModel.update(match, {
    ...update,
    updated_at: new Date().toISOString()
  });

  return domain;
};

export const remove = async (match: Partial<DomainType>) => {
  try {
    const domain = await DomainModel.findOne({
      id: { eq: match.id },
      user_id: { eq: match.user_id }
    });

    if (!domain) {
      throw new CustomError("domain was not found.");
    }

    const deletedDomain = await domain.delete();

    return !deletedDomain;
  } catch (e) {
    // @ts-ignore
    throw new CustomError(e.message);
  }
};
