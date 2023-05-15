import {
  ExecuteStatementCommand, ExecuteStatementCommandInput, ExecuteStatementCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../libs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

interface Prepare {
  browser: string;
  country: string;
  city: string;
  region: string;
  domain?: string;
  shortLinkId: { userId: string, createdAt: number };
  os: string;
  dv: string;
  creationDate?: number;
  referrer: string;
}

export const prepare = async (params: Prepare) => {
  try {
    let visit = await getByShortLink({ ...params.shortLinkId });

    let countries = undefined;
    let cities = undefined;
    let referrers = undefined;
    let creationDate = undefined;

    const city = params.city !== params.region ? `${params.city}${params.region ? `, ${params.region}` : ''}` : params.city;

    if (visit) {
      countries = {...visit.countries};
      if (countries[params.country]) {
        countries[params.country] += 1;
      } else {
        countries[params.country] = 1;
      }

      cities = {...visit.cities};
      if (cities[city]) {
        cities[city] += 1;
      } else {
        cities[city] = 1;
      }

      referrers = {...visit.referrers};
      if (referrers[params.referrer]) {
        referrers[params.referrer] += 1;
      } else {
        referrers[params.referrer] = 1;
      }

      // countries = Object.assign({}, visit.countries, {[data.country]: (visit.countries[data.country] || 0) + 1});
      // cities = Object.assign({}, visit.cities, {[data.city]: (visit.cities[data.city] || 0) + 1});
      // referrers = Object.assign({}, visit.referrers, {[data.referrer]: (visit.referrers[data.referrer] || 0) + 1});
    } else {
      countries = { [params.country]: 1 };
      cities = { [city]: 1 };
      creationDate = Date.now();
    }

    return { countries, cities, referrers, creationDate, shortLinkId: params.shortLinkId };
  } catch (e) {
    throw e;
  }
}

export const create = async (params: any) => {
  try {
    const visit = await getByShortLink({ ...params.shortLinkId });

    // const data = { ...params, country: params.country, referrer: params.referrer };

    const prefix: string = process.env.REACT_NODE_ENV === "production" ? "prd" : "dev";

    debugger;

    let input;
    if (visit) {
      // let countries = Object.assign({}, visit.countries,
      //   { [data.country]: (visit.countries[data.country] || 0) + 1 });
      //
      // let cities = Object.assign({}, visit.cities,
      //   { [data.city]: (visit.cities[data.city] || 0) + 1 });
      //
      // let referrers = Object.assign({}, visit.referrers, {
      //   [data.referrer]: (visit.referrers[data.referrer] || 0) + 1,
      // });

      input = <ExecuteStatementCommandInput>{
        Statement: `UPDATE ${prefix}_visits
        SET br_${params.browser}=?
        SET os_${params.os}=?
        SET dv_${params.dv}=?
        SET countries=?
        SET cities=?
        SET referrers=?
        SET total=?
        WHERE userId=? AND createdAt=?`,
        Parameters: [
          { "N": ((visit[`br_${params.browser}`] || 0) + 1).toString() },
          { "N": ((visit[`os_${params.os}`] || 0) + 1).toString() },
          { "N": ((visit[`dv_${params.dv}`] || 0) + 1).toString() },
          { "M": marshall(params.countries) },
          { "M": marshall(params.cities) },
          { "M": marshall(params.referrers) },
          { "N": (visit.total + 1).toString() },
          { "S": visit.userId },
          { "N": visit.createdAt.toString() }
        ]
      };
    } else {
      const creationDate = Date.now();
      input = <ExecuteStatementCommandInput>{
        Statement: `INSERT INTO ${prefix}_visits VALUE {
            'br_${params.browser}': 1,
            'os_${params.os}': 1,
            'dv_${params.dv}': 1,
            'countries':?,
            'cities':?,
            'referrers':?,
            'total':?,
            'userId':?,
            'shortLinkId':?,
            'createdAt':?
        }`,
        Parameters: [
          { "M": marshall({ [params.country]: 1 }) },
          { "M": marshall({ [params.city]: 1 }) },
          { "M": marshall({ [params.referrer]: 1 }) },
          { "N": "1" },
          { "S": params.shortLinkId.userId },
          {
            "M": marshall({
              "userId": params.shortLinkId.userId,
              "createdAt": params.shortLinkId.createdAt,
            }),
          },
          // @ts-ignore
          { "N": creationDate.toString() }
        ]
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
    const prefix: string = process.env.REACT_NODE_ENV === "production" ? "prd" : "dev";
    const input: ExecuteStatementCommandInput = {
      Statement: `SELECT * FROM ${prefix}_visits WHERE userId='${shortLinkId.userId}' and shortLinkId=?`,
      Parameters: [
        // @ts-ignore
        { "M": marshall(shortLinkId) }]
    };

    const command: ExecuteStatementCommand = new ExecuteStatementCommand(input);
    const response: ExecuteStatementCommandOutput = await ddbClient.send(command);
    // @ts-ignore
    return response.Items[0] ? unmarshall(response.Items[0]) : undefined;
  } catch (e) {
    // @ts-ignore
    throw e;
  }
};
