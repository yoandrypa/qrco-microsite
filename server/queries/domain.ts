import * as redis from "../redis";
import { Domain as DomainModel } from "../models";

export const find = async (match: Partial<DomainQuery>): Promise<Domain> => {
  if (match.address) {
    const cachedDomain = await redis.get(
      redis.key.domain(Object.values(match.address)[0])
    );
    if (cachedDomain) return JSON.parse(cachedDomain);
  }

  const domain = await DomainModel.findOne(match);

  if (domain) {
    redis.set(
      redis.key.domain(domain.address),
      JSON.stringify(domain),
      "EX",
      60 * 60 * 6
    );
  }

  return domain;
};

export const get = async (match: Partial<DomainQuery>): Promise<Domain[]> => {
  return await DomainModel.scan(match).exec();
};

interface Add extends Partial<Domain> {
  address: string;
}

export const add = async (params: Add) => {
  params.address = params.address.toLowerCase();

  const exists = await DomainModel.findOne({ address: { eq: params.address } });

  const newDomain = {
    address: params.address,
    homepage: params.homepage || null,
    user_id: params.user_id || "1234",
    banned: !!params.banned
  };

  let domain: Domain;
  if (exists) {
    const response: Domain = await DomainModel.update(exists.id, {
      ...newDomain,
      updated_at: params.updated_at || new Date().toISOString()
    });
    domain = response;
  } else {
    const response: Domain = await DomainModel.create(newDomain);
    domain = response;
  }

  redis.remove.domain(domain);

  return domain;
};

export const update = async (
  match: Partial<DomainQuery>,
  update: Partial<Domain>
) => {
  const domain = await DomainModel.update(match, {
    ...update,
    updated_at: new Date().toISOString()
  });

  redis.remove.domain(domain);

  return domain;
};
