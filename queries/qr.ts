import { ddbClient } from "../libs";
import {
  ExecuteStatementCommand,
  ExecuteStatementCommandInput,
  ExecuteStatementCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const getByShortLink = async (key: { userId: string, createdAt: number }) => {
  try {
    const prefix: string = process.env.REACT_NODE_ENV === "production"
      ? "prd_"
      : "dev_";
    const input: ExecuteStatementCommandInput = {
      Statement: "SELECT * FROM " + prefix +
        "qr_data WHERE userId=? and shortLinkId=?",
      // @ts-ignore
      Parameters: [marshall(key.userId), { "M": marshall(key) }],
    };

    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    const response: ExecuteStatementCommandOutput = await ddbClient.send(
      command);
    // @ts-ignore
    return response.Items[0] ? unmarshall(response.Items[0]) : null;
  } catch (e) {
    // @ts-ignore
    throw e;
  }
};
