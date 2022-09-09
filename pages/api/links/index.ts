// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as helpers from "../../../handlers/helpers";
import * as linkHandler from "../../../handlers/links";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //TODO middleware for cognito

    if (req.method === "GET") {
      helpers.query;

      // @ts-ignore
      res.status(200).json(await linkHandler.list(req.query));
    }

    if (req.method === "POST") {
      const { userId, ...body } = req.body;
      const link = await linkHandler.create({
        body,
        user: { id: userId }
      });
      res.status(200).json(link);
    }
  } catch (e) {
    // @ts-ignore
    res.status(e.statusCode || 500).json(e);
  }
}

