// @ts-ignore
export const query = async (req, res, next) => {
  const { limit, skip, all } = req.query;
  const { admin } = req.user || {};

  req.query.limit = parseInt(limit) || 10;
  req.query.skip = parseInt(skip) || 0;

  if (req.query.limit > 50) {
    req.query.limit = 50;
  }

  req.query.all = admin ? all === "true" : false;

  next();
};
