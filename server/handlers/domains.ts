import { Handler } from "express";
import query from "../queries";
import * as redis from "../redis";
import { CustomError, sanitize } from "../utils";

export const add: Handler = async (req, res) => {
  const { address, homepage } = req.body;

  const domain = await query.domain.add({
    address,
    homepage,
    user_id: "1234"
  });

  return res.status(200).send(sanitize.domain(domain));
};

export const remove: Handler = async (req, res) => {
  const domain = await query.domain.update(
    {
      id: { eq: req.params.id },
      user_id: { eq: "1234" }
    },
    { user_id: null }
  );

  redis.remove.domain(domain);

  if (!domain) {
    throw new CustomError("Could not delete the domain.", 500);
  }

  return res.status(200).send({ message: "Domain deleted successfully" });
};
