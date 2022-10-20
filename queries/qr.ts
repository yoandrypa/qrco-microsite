import {ddbClient} from "../libs";
import {
    ExecuteStatementCommand,
    ExecuteStatementCommandInput,
    ExecuteStatementCommandOutput
} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";

export const getByShortLink = async (shortLinkId: string) => {
    try {
        const prefix: string = process.env.REACT_NODE_ENV === "production" ? "prd_" : "dev_";
        const input: ExecuteStatementCommandInput = {
            Statement: "SELECT * FROM " + prefix + "qr_data WHERE shortLinkId=?",
            Parameters: [{"S": shortLinkId}],
        };

        const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
        const response: ExecuteStatementCommandOutput = await ddbClient.send(command);
        // @ts-ignore
        return unmarshall(response.Items[0]);
    } catch (e) {
        // @ts-ignore
        throw e
    }
};
