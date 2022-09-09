//import * as redis from "../redis";
import { UserModel as UserModel } from "../models/link";
import dynamoose from "../libs/dynamoose";
import { CustomError } from "../utils";

export const find = async (match: Partial<UserQueryType>) => {
  return await UserModel.findOne(match);
};

interface CreateData {
  id: string;
}

export const create = async (params: CreateData) => {
  const data = {
    id: params.id
  };

  return await UserModel.create(data);
};

export const update = async (match: Match<UserType>, update: Partial<UserType>) => {
  let condition = new dynamoose.Condition();
  Object.entries(match).forEach(([key, value], index) => {
    if (index === 0) {
      condition = condition.where(key).eq(value);
    } else {
      condition = condition
        .and()
        .where(key)
        .eq(value);
    }
  });

  return await UserModel.update(
    // @ts-ignore
    match.id,
    {
      ...update,
      updatedAt: new Date().toISOString()
    },
    { condition }
  );
};

export const remove = async (userId: string) => {
  const userToRemove = await UserModel.findOne({
    id: { eq: userId }
  });

  if (!userToRemove) {
    throw new CustomError("User was not found.");
  }

  UserModel.delete(userToRemove.id, ((error) => {
    return !error;
  }));
};
