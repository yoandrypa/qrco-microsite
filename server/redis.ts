import { promisify } from "util";
import redis from "redis";

import env from "./env";

const client = redis.createClient({
  host: env.REACT_REDIS_HOST,
  port: env.REACT_REDIS_PORT,
  ...(env.REACT_REDIS_PASSWORD && { password: env.REACT_REDIS_PASSWORD })
});

export const get: (key: string) => Promise<any> = promisify(client.get).bind(
  client
);

export const set: (
  key: string,
  value: string,
  ex?: string,
  exValue?: number
) => Promise<any> = promisify(client.set).bind(client);

export const del: (key: string) => Promise<any> = promisify(client.del).bind(
  client
);

export const key = {
  link: (address: object, domain_id?: object, user_id?: object) =>
    `${address}-${domain_id || ""}-${user_id || ""}`,
  domain: (address: string) => `d-${address}`,
  stats: (link_id: number | string) => `s-${link_id}`,
  host: (address: string) => `h-${address}`,
  user: (id: string) => `u-${id}`
};

export const remove = {
  domain: (domain?: Domain) => {
    if (!domain) return;
    del(key.domain(domain.address));
  },
  host: (host?: Host) => {
    if (!host) return;
    del(key.host(host.address));
  },
  link: (link?: Link) => {
    if (!link) return;
    del(key.link({ eq: link.address }, { eq: link.domain_id }));
  },
  user: (user?: User) => {
    if (!user) return;
    del(key.user(user.id));
  }
};
