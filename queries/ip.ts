import { subMinutes } from "date-fns";

import { Ip as IpModel } from "../models";

export const add = async (ipToAdd: string | undefined) => {
  const ip = ipToAdd?.toLowerCase();

  const currentIP = await IpModel.findOne({ ip: { eq: ip } });

  if (currentIP) {
    const currentDate = new Date().toISOString();
    // @ts-ignore
    await IpModel.update(ip, {
      created_at: currentDate,
      updated_at: currentDate
    });
  } else {
    await IpModel.create({ ip });
  }

  return ip;
};

export const find = async (match: Match<IPQueryType>) => {
  const ip = await IpModel.findOne(match);

  return ip[0];
};

export const clear = async () => {
  return IpModel.batchDeletes({
    created_at: {
      lt: subMinutes(new Date(), parseInt(<string>process.env.REACT_APP_NON_USER_COOLDOWN)).toISOString()
    }
  });
};
