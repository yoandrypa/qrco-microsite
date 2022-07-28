import env from "./env";

import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import nextApp from "next";
import * as Sentry from "@sentry/node";

import * as helpers from "./handlers/helpers";
import * as links from "./handlers/links";
import routes from "./routes";
import { stream } from "./config/winston";

import "./cron";

const port = env.PORT;
const app = nextApp({ dir: "./client", dev: env.isDev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.set("trust proxy", true);

  if (env.isDev) {
    server.use(morgan("combined", { stream }));
  } else if (env.SENTRY_PRIVATE_DSN) {
    Sentry.init({
      dsn: env.SENTRY_PRIVATE_DSN,
      environment: process.env.NODE_ENV
    });

    server.use(
      Sentry.Handlers.requestHandler({
        ip: true,
        user: ["id", "email"]
      })
    );
  }

  server.use(helmet());
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.static("static"));
  server.use(helpers.ip);

  server.use(asyncHandler(links.redirectCustomDomain));

  server.use("/api/v2", routes);

  server.get("/:id", asyncHandler(links.redirect(app)));

  // Error handler
  server.use(helpers.error);

  // Handler everything else by Next.js
  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
