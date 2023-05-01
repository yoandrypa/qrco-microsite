import {
  ExecuteStatementCommand,
  ExecuteStatementCommandInput, ExecuteStatementCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../libs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

interface Create {
  browser: string;
  country: string;
  city: string;
  domain?: string;
  shortLinkId: { userId: string, createdAt: number };
  os: string;
  dv: string;
  referrer: string;
}

export const create = async (params: Create) => {
  try {
    let visit = await getByShortLink({ ...params.shortLinkId });

    const data = { ...params, country: params.country, referrer: params.referrer };

    const prefix: string = process.env.REACT_NODE_ENV === "production" ? "prd" : "dev";

    let input;
    if (visit) {
      let countries = Object.assign({}, visit.countries,
        { [data.country]: (visit.countries[data.country] || 0) + 1 });

      let cities = Object.assign({}, visit.cities,
        { [data.city]: (visit.cities[data.city] || 0) + 1 });

      let referrers = Object.assign({}, visit.referrers, {
        [data.referrer]: (visit.referrers[data.referrer] || 0) + 1,
      });

      input = <ExecuteStatementCommandInput>{
        Statement: `UPDATE ${prefix}_visits
        SET br_${data.browser}=?
        SET os_${data.os}=?
        SET dv_${data.dv}=?
        SET countries=?
        SET cities=?
        SET referrers=?
        SET total=?
        WHERE userId=? AND createdAt=?`,
        Parameters: [
          { "N": ((visit[`br_${data.browser}`] || 0) + 1).toString() },
          { "N": ((visit[`os_${data.os}`] || 0) + 1).toString() },
          { "N": ((visit[`dv_${data.dv}`] || 0) + 1).toString() },
          { "M": marshall(countries) },
          { "M": marshall(cities) },
          { "M": marshall(referrers) },
          { "N": (visit.total + 1).toString() },
          { "S": visit.userId },
          { "N": visit.createdAt.toString() },
        ],
      };
    } else {
      const creationDate = Date.now();
      console.log(creationDate, creationDate.toString())

      input = <ExecuteStatementCommandInput>{
        Statement: `INSERT INTO ${prefix}_visits VALUE {
            'br_${data.browser}':?,
            'os_${data.os}':?,
            'dv_${data.dv}':?,
            'countries':?,
            'cities':?,
            'referrers':?,
            'total':?,
            'userId':?,
            'shortLinkId':?,
            'createdAt':?
        }`,
        Parameters: [
          { "N": "1" },
          { "N": "1" },
          { "N": "1" },
          { "M": marshall({ [data.country]: 1 }) },
          { "M": marshall({ [data.city]: 1 }) },
          { "M": marshall({ [data.referrer]: 1 }) },
          { "N": "1" },
          { "S": params.shortLinkId.userId },
          {
            "M": marshall({
              "userId": params.shortLinkId.userId,
              "createdAt": params.shortLinkId.createdAt,
            }),
          },
          // @ts-ignore
          { "N": creationDate.toString() },
        ],
      };
    }
    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    await ddbClient.send(command);
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
