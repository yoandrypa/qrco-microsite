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
      contactEmail: Joi.string().required().regex(/^\w+([.+]\w+)?@(\w+\.)+([a-z]{2,3})/),
      message: Joi.string().required(),
      microSiteUrl: Joi.string().required(),
    }).required(),
  });

  const { index, content, subject } = Joi.attempt(req.body, schema, { abortEarly: false });

  return {
    subject,
    fromAddresses: 'info@ebanux.com',
    toAddresses: await getEmailRecipient(content.microSiteUrl, index),
    replyToAddresses: content.contactEmail,
    content,
    template: 'contact-form-message',
  }
}
