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

  next();git add src/routes/sumNumber.route.ts src/routes/tracking.route.ts src/controller/sumNumber.controller.ts src/service/sumNumberService.ts src/validator/sumNumber.validator.ts

};
