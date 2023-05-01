import { ddbClient } from "../libs";
import {
  ExecuteStatementCommand,
  ExecuteStatementCommandOutput,
  ExecuteStatementCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export const incrementVisit = (userId: string, createdAt: number, currenValue: number) => {
  try {
    const prefix: string = process.env.REACT_NODE_ENV === "production" ? "prd_" : "dev_";
    const input: ExecuteStatementCommandInput = {
      Statement: `UPDATE ${prefix}links SET visitCount=${currenValue + 1} WHERE userId='${userId}' and createdAt=${createdAt}`,
    };

    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    ddbClient.send(command);
  } catch (e) {
    // @ts-ignore
    throw e;
  }
};

export const getByAddress = async (address: string) => {
  try {
    const prefix: string = process.env.REACT_NODE_ENV === "production" ? "prd_" : "dev_";
    const input: ExecuteStatementCommandInput = {
      Statement: "SELECT * FROM " + prefix + "links.addressIndex WHERE address=?",
      Parameters: [{ "S": address }],
    };

    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    const response: ExecuteStatementCommandOutput = await ddbClient.send(command);
    // @ts-ignore
    return response.Items[0] ? unmarshall(response.Items[0]) : null;
  } catch (e) {
    // @ts-ignore
    throw e;
  }
};
