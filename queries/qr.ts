import { ddbClient, tableName } from "../libs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";

export const getByShortLink = async (key: { userId: string, createdAt: number }) => {
  const command = new ExecuteStatementCommand({
    Statement: `SELECT * FROM ${tableName('qr_data')} WHERE userId=? and shortLinkId=?`,
    Parameters: [{ 'S': key.userId }, { "M": marshall(key) }],
  });

  const response = await ddbClient.send(command);

  return response.Items?.[0] ? unmarshall(response.Items?.[0] as any) : null;
};

export const getByLinkId = async ({ userId, createdAt }: any) => {
  const command = new ExecuteStatementCommand({
    Statement: `SELECT * FROM  ${tableName('qr_data')} WHERE shortLinkId=?`,
    Parameters: [{ 'M': marshall({ userId, createdAt }) }],
  });

  const response = await ddbClient.send(command);

  return response.Items?.[0] ? unmarshall(response.Items?.[0] as any) : null;
}
