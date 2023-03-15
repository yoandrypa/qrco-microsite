import Joi from "joi";

import { NextApiRequest } from "next";
import queries from "../../../../../queries";

export { NotFound, respondWithException } from "../../../../../libs/exceptions";

/**
 * Parse and validate the request via POST
 * @param req
 */
export async function parseFromPostRequest(req: NextApiRequest): Promise<any> {
  const schema = Joi.object({
    contactEmail: Joi.string().required().regex(/^\w+([.+]\w+)?@(\w+\.)+([a-z]{2,3})/),
    subject: Joi.string().required(),
    content: Joi.object({
      message: Joi.string().required(),
      microSiteUrl: Joi.string().required(),
    }).required(),
  });

  const { contactEmail, ...data } = Joi.attempt(req.body, schema, { abortEarly: false });

  return {
    ...data,
    fromAddresses: 'info@ebanux.com',
    toAddresses: await getEmailRecipient(data.content.microSiteUrl),
    replyToAddresses: contactEmail,
    template: 'contact-form-message',
  }
}

function parseCodeFormUrl(url: string): string {
  return url.split('/').pop() as string
}

async function getEmailRecipient(microSiteUrl: string): Promise<string> {
  const code = parseCodeFormUrl(microSiteUrl);
  const link = await queries.link.getByAddress(code);
  const qr: any = await queries.qr.getByLinkId(link);
  const contact: any = qr.custom.find(({ component }: any) => component === 'contact');
  const { email } = contact.data;

  return email;
}

export async function sendEmail(data: any) {
  const url = 'https://eyk58kso8i.execute-api.us-east-1.amazonaws.com/ebanux-prod/email';
  const options = {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log(JSON.stringify(data, null, 2));

  const response = await fetch(url, options);

  if (!response.ok) throw new Error(response.statusText);

  const result = await response.json();

  return { type: 'send-contact-email', result };
}
