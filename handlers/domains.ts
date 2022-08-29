import query from "../queries";
import { CustomError, sanitize } from "../utils";

export const list = async (params: any) => {
  return await query.domain.get({ user_id: { eq: params.user_id } });
};

export const find = async (params: any) => {
  return await query.domain.find({ id: { eq: params.id } });
};

export const add = async (params: { body: { address: string; homepage: string; user_id: string; }; }) => {
  const { address, homepage, user_id } = params.body;

  const domain = await query.domain.add({
    address,
    homepage,
    user_id
  });

  return sanitize.domain(domain);
};

export const remove = async (domain_id: string, user_id: string) => {
  //TODO review this logic
  const domain = await query.domain.update(
    {
      id: { eq: domain_id },
      user_id: { eq: user_id }
    },
    { user_id: undefined }
  );

  if (!domain) {
    throw new CustomError("Could not delete the domain.", 500);
  }

  return { message: "Domain deleted successfully" };
};
