// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as helpers from "../../../handlers/helpers";
import * as link from "../../../handlers/links";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    //TODO middleware for cognito

    if (req.method === "GET") {
      helpers.query;

      // @ts-ignore
      res.status(200).json(link.list(req.query));
    }
  } catch (e) {
    res.status(500).json(e);
  }
}

