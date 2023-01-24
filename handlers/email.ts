/** 
 * @param senderAddess Sender account (Verified in AWS SES)
 * @param destinationAddress Array up to 50 destination email address. 
 * @param templateName Identifier of the AWS SES template
 * @param templateData Template data
 */
export default async function sendSESEmail(
    senderAddess: string,
    destinationAddress: string[],
    templateName: string,
    templateData: Object,
) {
    const payload = {
        template: templateName,
        templateData: JSON.stringify(templateData),
        params: {
            Destination: {
                ToAddresses: destinationAddress
            },
            Source: senderAddess,
            Template: templateName,
            TemplateData: JSON.stringify(templateData),
            ReplyToAddresses: senderAddess
        }
    }

    const options = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(`https://eyk58kso8i.execute-api.us-east-1.amazonaws.com/Test/test`, options)
        if (!response.ok) {
            return new Error(response.statusText);
        } else {
            const data = await response.json();
            return true;
        }
    } catch (error: any) {
        //exceptions
        return new Error(error.message);
    }
}