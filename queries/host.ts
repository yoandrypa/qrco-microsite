import { HostModel as HostModel } from "../models/link";

interface Add extends Partial<HostType> {
  address: string;
}

export const find = async (match: Partial<HostQueryType>): Promise<HostType> => {
  /*if (match.address) {
    const cachedHost = await redis.get(
      redis.key.host(Object.values(match.address)[0])
    );
    if (cachedHost) return JSON.parse(cachedHost);
  }*/

  const host = await HostModel.findOne(match);

  /*if (host) {
    redis.set(
      redis.key.host(host.address),
      JSON.stringify(host),
      "EX",
      60 * 60 * 6
    );
  }*/

  return host;
};

export const add = async (params: Add) => {
  params.address = params.address.toLowerCase();

  const exists = await HostModel.findOne({
    address: { eq: params.address }
  });

  const newHost = {
    address: params.address,
    banned: !!params.banned
  };

  let host: HostType;
  if (exists) {
    // @ts-ignore
    host = await HostModel.update(exists.id, {
      ...newHost,
      updatedAt: params.updatedAt || new Date().toISOString()
    });
  } else {
    // @ts-ignore
    host = await HostModel.create(newHost);
  }

  //redis.remove.host(host);

  return host;
};
