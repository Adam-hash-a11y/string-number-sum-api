import express from "express";
import { getCallsHistory, getCallById } from "../controller/sumNumber.controller";

export const trackingRouter = express.Router();

trackingRouter.get("/", getCallsHistory);
trackingRouter.get("/:id", getCallById)