
import type { NextApiRequest, NextApiResponse } from 'next'
import sendSESEmail from '../../../handlers/email';
type Data = {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method == 'POST') {
        const { templateData, contactEmail } = req.body;
        if (
            !templateData ||
            !contactEmail
        ) return res.status(400).json({ error: true, message: 'Bad request' })

        const result = await sendSESEmail("info@ebanux.com",
            contactEmail,
            "new-contact-form-message-template",
            templateData
        );
        if (result instanceof Error) {
            console.log(result);
            return res.status(500).json({});
        }
        return res.status(200).json({ success: true })
    }
}