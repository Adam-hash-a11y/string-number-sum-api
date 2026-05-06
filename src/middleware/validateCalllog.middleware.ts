import { Request, Response, NextFunction } from "express";
import { isValidStatus } from "../validator/sumNumber.validator";
import { CallStatus } from "../types/callLog.types";

export const validateGetCallLogs = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status } = req.query;

  if (status) {
    if (!isValidStatus(status as CallStatus)) {
      return res
        .status(400)
        .json({ message: "status must be success or failed" });
    }
  }
  next();
};
