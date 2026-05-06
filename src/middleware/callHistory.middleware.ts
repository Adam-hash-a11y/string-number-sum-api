import { NextFunction, Request, Response } from "express";
import { isAPositiveNumber } from "../validator/sumNumber.validator";
export const validateGetCallById = (
  req: Request<{ id: string | number }>,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  if (!isAPositiveNumber(String(id))) {
    return res
      .status(400)
      .json({ message: "call id must be a positive integer" });
  }

  next();
};
