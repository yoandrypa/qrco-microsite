import Joi from "joi";

import { NextApiRequest } from "next";
import { getEmailRecipient } from "../../../commons/helpers";

export {
  NotFound,
  respondWithException,
  sendEmail,
} from "../../../commons/helpers";

/**
 * Parse and validate the request via POST
 * @param req
 */
export async function parseFromPostRequest(req: NextApiRequest): Promise<any> {
  const schema = Joi.object({
    index: Joi.number().min(0).required(),
    subject: Joi.string().required(),
    content: Joi.object({
      contactName: Joi.string().optional(),
      message: Joi.string().required(),
      microSiteUrl: Joi.string().required(),
    }).required(),
  });

  const { index, ...data } = Joi.attempt(req.body, schema, { abortEarly: false });
  data.content.dashboardUrl =  `${process.env.PAYLINK_BASE_URL}/dashboards`;

  return {
    ...data,
    fromAddresses: 'info@ebanux.com',
    toAddresses: await getEmailRecipient(data.content.microSiteUrl, index),
    template: 'donation-review-message',
  }
}
