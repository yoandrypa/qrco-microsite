import query from "../queries";
import * as utils from "../utils";

export const create = async (data: UserType) => {
  return await query.user.create(data);
};

export const find = async (userId: string) => {
  return await query.user.find({ id: { eq: userId } })
};

export const remove = async (userId: string) => {
  await query.user.remove(userId);
  return "OK";
};
