// src/middleware/sumNumber.middleware.ts
import { Request, Response, NextFunction } from "express";
import { SumNumberBody } from "../types/sumNumber.types";
import {
  isValidBody,
  isAllDigits,
  isValidN,
  isNGreaterThanLength,
} from "../validator/sumNumber.validator";
import { sanitizeCh } from "../service/sumNumberService";

export const sumNumberMiddleware = (
  req: Request<{ id: number | string }>,
  res: Response,
  next: NextFunction,
) => {
  if (!isValidBody(req.body)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { n, ch, sanitize } = req.body as SumNumberBody;

  const cleanCh = sanitize === true ? sanitizeCh(ch) : ch;

  if (!isAllDigits(cleanCh)) {
    return res.status(400).json({ message: "ch must be a numeric string" });
  }

  if (!isValidN(n)) {
    return res.status(400).json({ message: "n must be a positive integer" });
  }

  if (isNGreaterThanLength(cleanCh, n)) {
    return res
      .status(400)
      .json({ message: "n cannot exceed the length of ch" });
  }

  req.body.ch = cleanCh;
  next();
};
