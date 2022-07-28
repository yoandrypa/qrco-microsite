import * as redis from "../redis";
import { User as UserModel } from "../models";
import dynamoose from "../libs/dynamoose";
import { CustomError } from "../utils";

export const find = async (match: Partial<User>) => {
  if (match.id) {
    const key = redis.key.user(match.id);
    const cachedUser = await redis.get(key);
    if (cachedUser) return JSON.parse(cachedUser) as User;
  }

  const user = await UserModel.findOne(match);

  if (user) {
    const id = redis.key.user(user.id);
    redis.set(id, user.toJSON(), "EX", 60 * 60 * 1);
  }

  return user;
};

interface Add {
  id: string;
}

export const add = async (params: Add, user?: User) => {
  const data = {
    id: params.id
  };

  if (user) {
    await UserModel.update(data.id, {
      ...data,
      updated_at: new Date().toISOString()
    });
  } else {
    await UserModel.create(data);
  }

  redis.remove.user(user);

  return user;
};

export const update = async (match: Match<User>, update: Partial<User>) => {
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

  const user = await UserModel.update(
    match.id,
    {
      ...update,
      updated_at: new Date().toISOString()
    },
    { condition }
  );

  redis.remove.user(user);

  return user;
};

export const remove = async (user: User) => {
  const userToRemove = await UserModel.findOne({
    id: { eq: user.id }
  });

  if (!userToRemove) {
    throw new CustomError("User was not found.");
  }

  redis.remove.user(user);

  const deletedUser = await UserModel.delete(userToRemove.id);

  return !deletedUser;
};
