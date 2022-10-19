import {ddbClient} from "../libs";
import {ExecuteStatementCommand} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";

export const getByShortLink = async (shortLinkId: string) => {
    try {
        const input = {
            Statement: "SELECT * FROM dev_qr_data WHERE shortLinkId=?",
            Parameters: [{"S": shortLinkId}],
        };

        const command = new ExecuteStatementCommand(input);
        const response = await ddbClient.send(command);
        // @ts-ignore
        return unmarshall(response.Items[0]);
    } catch (e) {
        // @ts-ignore
        throw e
    }
};
