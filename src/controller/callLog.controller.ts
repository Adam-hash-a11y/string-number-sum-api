// src/controller/callLog.controller.ts
import { Request, Response } from "express";
import {
  getAllCallLogs,
  getCallLogById,
  getCallLogsByStatus,
} from "../service/callLogService";
import { CallStatus } from "../types/callLog.types";

export const getCallLogs = async (req: Request, res: Response) => {
  const { status } = req.query as { status?: CallStatus };

  if (status) {
    const result = await getCallLogsByStatus(status);
    return res.status(200).json(result);
  }

  const result = await getAllCallLogs();
  return res.status(200).json(result);
};

export const getCallLog = async (
  req: Request<{ id: number }>,
  res: Response,
) => {
  const result = await getCallLogById(req.params.id);

  if (!result) {
    return res.status(404).json({ message: "call log not found" });
  }

  return res.status(200).json(result);
};
