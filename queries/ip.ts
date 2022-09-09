import { subMinutes } from "date-fns";

import { IpModel as IpModel } from "../models/link";

export const add = async (ipToAdd: string | undefined) => {
  const ip = ipToAdd?.toLowerCase();

  const currentIP = await IpModel.findOne({ ip: { eq: ip } });

  if (currentIP) {
    const currentDate = new Date().toISOString();
    // @ts-ignore
    await IpModel.update(ip, {
      createdAt: currentDate,
      updatedAt: currentDate
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
    createdAt: {
      lt: subMinutes(new Date(), parseInt(<string>process.env.REACT_APP_NON_USER_COOLDOWN)).toISOString()
    }
  });
};
