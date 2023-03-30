import queries from "../../../queries";

export { NotFound, respondWithException } from "../../../libs/exceptions";

export function parseCodeFormUrl(url: string): string {
  return url.split('/').pop() as string
}

export async function getEmailRecipient(microSiteUrl: string, index?: number): Promise<string> {
  const code = parseCodeFormUrl(microSiteUrl);
  const link = await queries.link.getByAddress(code);
  const qr: any = await queries.qr.getByLinkId(link);

  return qr.custom[index].data.email;
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

  const response = await fetch(url, options);

  if (!response.ok) throw new Error(response.statusText);

  const result = await response.json();

  return { type: 'send-contact-email', result };
}
