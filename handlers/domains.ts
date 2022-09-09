import query from "../queries";
import { CustomError, sanitize } from "../utils";
import queries from "../queries";

export const list = async (params: any) => {
  return await query.domain.get({ userId: { eq: params.userId } });
};

export const find = async (params: any) => {
  return await query.domain.find({ id: { eq: params.id } });
};

export const add = async (params: { body: { address?: string; userId: any; homepage?: string } }) => {
  const { address, homepage, userId } = params.body;

  const domain = await query.domain.add({
    // @ts-ignore
    address,
    homepage,
    userId
  });

  return sanitize.domain(domain);
};

export const remove = async (domain_id: string, userId?: string) => {
  //TODO review this logic
  /*const domain = await query.domain.update(
    {
      id: { eq: domain_id },
      userId: { eq: userId }
    },
    { userId: "" }
  );*/

  const domain = await queries.domain.remove({
    id: domain_id,
    userId: userId
  });

  if (!domain) {
    throw new CustomError("Could not delete the domain.", 500);
  }

  return { message: "DomainModel deleted successfully" };
};
