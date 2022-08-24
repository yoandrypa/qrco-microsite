import * as utils from "../utils";
import queries from "../queries";

interface Query {
  link?: any;
  limit?: any;
  skip?: any;
  search?: any;
  all?: any;
};

export const list = async (query: Query) => {
  try {
    const { limit, skip, search, all } = query;
    const userId = "1234"; //req.user.id;

    const match = {
      ...(!all && { user_id: { eq: userId } })
    };

    // @ts-ignore
    const [links, total] = await queries.link.get(match, { limit, search, skip });

    const data = links.map(utils.sanitize.link);

    return {
      total,
      limit,
      skip,
      data
    };
  } catch (e) {
    throw e;
  }
};
