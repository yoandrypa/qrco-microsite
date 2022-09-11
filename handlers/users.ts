import query from "../queries";

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

export const update = async (user: Match<UserType>, data: Partial<UserType>) => {
const updatedUser = await query.user.update(user,data)
return updatedUser
}

export const findByCustomerId = async (customerId: string): Promise<UserType> => {
  return await query.user.findByCustomerId({ customerId: { eq: customerId } })
};

export const deleteUserSubscription = async (customerId: Match<UserType>) =>{
  return await query.user.deleteSubscription({customerId: customerId})
} 
