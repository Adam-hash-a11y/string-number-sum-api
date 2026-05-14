import express from "express";
import { getCallLog, getCallLogs } from "../controller/callLog.controller";
import { validateGetCallById } from "../middleware/callHistory.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateGetCallLogs } from "../middleware/validateCalllog.middleware";

export const trackingRouter = express.Router();
trackingRouter.use(authMiddleware);
trackingRouter.get("/", validateGetCallLogs, getCallLogs);
trackingRouter.get("/:id", validateGetCallById, getCallLog);
