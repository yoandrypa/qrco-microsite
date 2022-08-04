import Queue from "bull";
import path from "path";

/*import env from "../env";

const redis = {
  port: env.REACT_REDIS_PORT,
  host: env.REACT_REDIS_HOST,
  ...(env.REACT_REDIS_PASSWORD && { password: env.REACT_REDIS_PASSWORD })
};*/

const removeJob = job => job.remove();

export const visit = new Queue("visit", {});

visit.clean(5000, "completed");

visit.process(8, path.resolve(__dirname, "visit.js"));

visit.on("completed", removeJob);
