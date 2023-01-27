import { ddbClient } from "../libs";
import {
  ExecuteStatementCommand,
  ExecuteStatementCommandOutput,
  ExecuteStatementCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const get = async (key: string) => {
  try {
    const prefix: string = process.env.REACT_NODE_ENV === "production"
      ? "prd_"
      : "dev_";
    const input: ExecuteStatementCommandInput = {
      Statement: "SELECT * FROM " + prefix +
        "pre_generated WHERE id=?",
      Parameters: [{ "S": key }],
    };

    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    const response: ExecuteStatementCommandOutput = await ddbClient.send(
      command);
    // @ts-ignore
    return response.Items[0] ? unmarshall(response.Items[0]) : null;
  } catch (e) {
    throw e;
  }
};