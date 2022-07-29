import cron from "node-cron";

import query from "./queries";
import env from "./env";

if (env.REACT_NON_USER_COOLDOWN) {
  cron.schedule("* */24 * * *", () => {
    query.ip.clear().catch();
  });
}

cron.schedule("*/15 * * * * *", () => {
  query.link
    .batchRemove({ expire_in: { lt: new Date().toISOString() } })
    .catch();
});
