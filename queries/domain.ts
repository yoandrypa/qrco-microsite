import { DomainModel as DomainModel } from "../models/link";
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
    userId: params.userId || "1234",
    banned: !!params.banned
  };

  let domain: DomainType;
  if (exists) {
    // @ts-ignore
    domain = await DomainModel.update(exists.id, {
      ...newDomain,
      updatedAt: params.updatedAt || new Date().toISOString()
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
    updatedAt: new Date().toISOString()
  });

  return domain;
};

export const remove = async (match: Partial<DomainType>) => {
  try {
    const domain = await DomainModel.findOne({
      id: { eq: match.id },
      userId: { eq: match.userId }
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
