import express from "express";
import bodyParser from "body-parser";
import { router } from "../routes";

export const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.use("/api", router);
