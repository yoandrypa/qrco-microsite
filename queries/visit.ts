import {
  ExecuteStatementCommand,
  ExecuteStatementCommandInput, ExecuteStatementCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../libs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

interface Create {
  browser: string;
  country: string;
  domain?: string;
  shortLinkId: { userId: string, createdAt: number };
  os: string;
  referrer: string;
}

export const create = async (params: Create) => {
  try {
    let visit = await getByShortLink({ ...params.shortLinkId });

    const data = {
      ...params,
      country: params.country.toLowerCase(),
      referrer: params.referrer.toLowerCase(),
    };

    const prefix: string = process.env.REACT_NODE_ENV === "production"
      ? "prd"
      : "dev";
    if (visit) {
      let countries = Object.assign({}, visit.countries,
        { [data.country]: visit.countries[data.country] + 1 });
      countries = Object.keys(countries).map(key => {
        return `'${key}' : ${countries[key]}`;
      }).join(", ");
      let referrers = Object.assign({}, visit.referrers, {
        [data.referrer]: visit.referrers[data.referrer] + 1,
      });
      referrers = Object.keys(referrers).map(key => {
        return `'${key}' : ${referrers[key]}`;
      }).join(", ");
      const input: ExecuteStatementCommandInput = {
        Statement: `UPDATE ${prefix}_visits
        SET br_${data.browser}=${visit[`br_${data.browser}`] + 1}
        SET os_${data.os}=${visit[`os_${data.os}`] + 1}
        SET total=${visit.total + 1}
        SET countries={${countries}}
        SET referrers={${referrers}}
        WHERE userId='${visit.userId}' AND createdAt=${visit.createdAt}`,
      };

      const command: ExecuteStatementCommand = new ExecuteStatementCommand(
        input);
      await ddbClient.send(command);
    } else {
      const input: ExecuteStatementCommandInput = {
        Statement: `INSERT INTO ${prefix}_visits VALUE {
            'br_${data.browser}' : 1,
            'os_${data.os}' : 1,
            'countries' : { '${data.country}' : 1 },
            'referrers' : { '${data.referrer}' : 1 },
            'total' : 1,
            'userId' : '${params.shortLinkId.userId}',
            'shortLinkId' : {
                'userId' : '${params.shortLinkId.userId}',
                'createdAt' : ${params.shortLinkId.createdAt}
            },
            'createdAt' : ${Date.now()}
        }`,
      };

      const command: ExecuteStatementCommand = new ExecuteStatementCommand(
        input);
      await ddbClient.send(command);
    }
  } catch (e) {
    throw e;
  }
};

const getByShortLink = async (shortLinkId: { userId: string, createdAt: number }) => {
  try {
    const prefix: string = process.env.REACT_NODE_ENV === "production"
      ? "prd"
      : "dev";
    const input: ExecuteStatementCommandInput = {
      Statement: `SELECT * FROM ${prefix}_visits WHERE userId=? and shortLinkId=?`,
      Parameters: [
        // @ts-ignore
        marshall(shortLinkId.userId),
        { "M": marshall(shortLinkId) }],
    };

    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    const response: ExecuteStatementCommandOutput = await ddbClient.send(
      command);
    // @ts-ignore
    return response.Items[0] ? unmarshall(response.Items[0]) : undefined;
  } catch (e) {
    // @ts-ignore
    throw e;
  }
};
