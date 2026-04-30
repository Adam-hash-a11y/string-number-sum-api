import express from "express";
import { getCallsHistory, getCallById } from "../controller/sumNumber.controller";
import { validateGetCallById } from "../middleware/callHistory.middleware";

export const trackingRouter = express.Router();

trackingRouter.get("/", getCallsHistory);
trackingRouter.get("/:id",validateGetCallById, getCallById)