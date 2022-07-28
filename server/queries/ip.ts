import { subMinutes } from "date-fns";

import { Ip as IpModel } from "../models";
import env from "../env";

export const add = async (ipToAdd: string) => {
  const ip = ipToAdd.toLowerCase();

  const currentIP = await IpModel.findOne({ ip: { eq: ip } });

  if (currentIP) {
    const currentDate = new Date().toISOString();
    await IpModel.update(ip, {
      created_at: currentDate,
      updated_at: currentDate
    });
  } else {
    await IpModel.create({ ip });
  }

  return ip;
};

export const find = async (match: Match<IPQuery>) => {
  const ip = await IpModel.findOne(match);

  return ip[0];
};

export const clear = async () =>
  IpModel.batchDeletes({
    created_at: {
      lt: subMinutes(new Date(), env.NON_USER_COOLDOWN).toISOString()
    }
  });
