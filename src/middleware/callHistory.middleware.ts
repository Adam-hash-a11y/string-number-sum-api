import { NextFunction, Request, Response } from "express";
import { isAPositiveNumber } from "../validator/sumNumber.validator";
export const validateGetCallById = (
  req: Request<{ id: string | number }>,
  res: Response,
  next: NextFunction,
) => {
  if (isAPositiveNumber(req.params.id as string)) {
    return res
      .status(400)
      .json({ message: "call id must be a positive integer" });
  }
  req.params.id = Number(req.params.id);
  next();
};
