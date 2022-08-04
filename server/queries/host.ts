//import * as redis from "../redis";
import { Host as HostModel } from "../models";

interface Add extends Partial<Host> {
  address: string;
}

export const find = async (match: Partial<HostQuery>): Promise<Host> => {
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

  let host: Host;
  if (exists) {
    const response = await HostModel.update(exists.id, {
      ...newHost,
      updated_at: params.updated_at || new Date().toISOString()
    });
    host = response;
  } else {
    const response = await HostModel.create(newHost);
    host = response;
  }

  //redis.remove.host(host);

  return host;
};
