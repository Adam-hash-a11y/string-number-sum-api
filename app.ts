import express from "express";
import bodyParser from "body-parser";
import { router } from "./src/routes";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    xDownloadOptions: false,

    frameguard: { action: "deny" },

    hidePoweredBy: true,

    noSniff: true,

    xssFilter: true,

    hsts: {
      maxAge: 15552000, // 180 days
      includeSubDomains: true,
    },
  }),
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10000,
    statusCode: 429,
    message: {
      success: false,
      error: "Slow down, Please try again in 5 minutes.",
      retryAfter: "5 minutes",
    },
    legacyHeaders: false,
    standardHeaders: "draft-7",
  }),
);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.use("/api", router);
