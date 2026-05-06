import express from "express";
import {
  getCallsHistory,
  getCallById,
} from "../controller/sumNumber.controller";
import { validateGetCallById } from "../middleware/callHistory.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

export const trackingRouter = express.Router();
trackingRouter.use(authMiddleware);
trackingRouter.get("/", getCallsHistory);
trackingRouter.get("/:id", validateGetCallById, getCallById);
