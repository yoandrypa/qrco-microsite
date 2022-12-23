import type { NextApiRequest, NextApiResponse } from 'next'
import { NEW_DONATION_REVIEW_HTML, NEW_DONATION_REVIEW_PLAIN } from '../../../helpers/emails/templates'


type Data = {
    error?: boolean
    success?: boolean,
    message: string,
    data?: any
}


// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    const checkoutsURL = process.env.REACT_NODE_ENV == 'develop' ?
        'https://dev-app.ebanux.com/checkouts' :
        'https://app.ebanux.com/checkouts';

    if (req.method == 'POST') {
        const { name, message, micrositeUrl, email } = req.body;
        if (
            !message ||
            !micrositeUrl ||
            !email
        ) return res.status(400).json({ error: true, message: 'Bad request' })


        const htmlEmailBody = NEW_DONATION_REVIEW_HTML(micrositeUrl, name, message, checkoutsURL);
        const plainEmailBody = NEW_DONATION_REVIEW_PLAIN(micrositeUrl, name, message, checkoutsURL);

        const data = {
            template: "new-donation-review-template",
            templateData: `{"name": "${name}",\"dashboardUrl\": "${checkoutsURL}","message": "${message}","micrositeURL":"${micrositeUrl}" }`,
            params: {
                Destination: {
                    ToAddresses: [email]
                },
                Source: "info@ebanux.com",
                Template: "new-donation-review-template",
                TemplateData: `{"name": "${name}","dashboardUrl": "${checkoutsURL}","message": "${message}","micrositeURL":"${micrositeUrl}" }`,
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



    }



}