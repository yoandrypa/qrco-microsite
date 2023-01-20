
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method == 'POST') {
        const { name, message, micrositeUrl, contactEmail, phone } = req.body;
        if (
            !name ||
            !message ||
            !contactEmail
        ) return res.status(400).json({ error: true, message: 'Bad request' })
        const templateData = {
            name: name,
            micrositeUrl: micrositeUrl,
            contactEmail: contactEmail
        }
        const data = {
            template: "new-contact-form-message-template",
            templateData: JSON.stringify(templateData),
            params: {
                Destination: {
                    ToAddresses: [contactEmail]
                },
                Source: "info@ebanux.com",
                Template: "new-donation-review-template",
                TemplateData: `{"name": "${name}","micrositeUrl": "${micrositeUrl}","message": "${message} \n\n\n Phone: ${phone}" }`,
                ReplyToAddresses: ["info@ebanux.com"]
            }
        }
        const options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };

        try {
            console.log(data)
            const response = await fetch(`https://eyk58kso8i.execute-api.us-east-1.amazonaws.com/Test/test`, options)
            if (!response.ok) {
                return res.status(500).json({ error: true, message: response.statusText })
            } else {
                const data = await response.json();
                return res.status(200).json({ success: true, message: data })
            }
        } catch (error: any) {
            //exceptions
            return res.status(500).json({ error: true, message: error })
        }

        res.status(200).json({})
    }
}