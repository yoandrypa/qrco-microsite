import { NextApiRequest, NextApiResponse } from 'next';
import {
  NotFound,
  respondWithException,
  parseFromPostRequest,
  sendEmail
} from './helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result;

  try {
    if (req.method === 'POST') {
      const data: any = await parseFromPostRequest(req);
      result = await sendEmail(data);
    } else {
      throw new NotFound;
    }

    res.status(200).json(result);
  } catch (ex: any) {
    respondWithException(res, ex);
  }
}