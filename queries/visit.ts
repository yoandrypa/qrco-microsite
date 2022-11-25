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
  continent: string;
  domain?: string;
  shortLinkId: { userId: string, createdAt: number };
  os: string;
  dv: string;
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
      let continents = Object.assign({}, visit.continents,
        { [data.continent]: visit.continents[data.continent] + 1 });
      continents = Object.keys(continents).map(key => {
        return `'${key}' : ${continents[key]}`;
      }).join(", ");

      let countries = Object.assign({}, visit.countries,
        { [data.country]: visit.countries[data.country] + 1 });
      countries = Object.keys(countries).map(key => {
        return `'${key}' : ${countries[key]}`;
      }).join(", ");

      let cities = Object.assign({}, visit.cities,
        { [data.city]: visit.cities[data.city] + 1 });
      cities = Object.keys(cities).map(key => {
        return `'${key}' : ${cities[key]}`;
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
        SET dv_${data.dv}=${visit[`dv_${data.dv}`] + 1}
        SET continents={${continents}}
        SET countries={${countries}}
        SET cities={${cities}}
        SET referrers={${referrers}}
        SET total=${visit.total + 1}
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
            'dv_${data.dv}' : 1,
            'continents' : { '${data.continent}' : 1 },
            'countries' : { '${data.country}' : 1 },
            'cities' : { '${data.city}' : 1 },
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
