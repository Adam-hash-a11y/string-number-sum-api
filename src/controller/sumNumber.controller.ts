import { Request, Response } from "express";
import {
  isValidBody,
  isAllDigits,
  isValidN,
  isNGreaterThanLength,
  isNEqualToLength,
} from "../validator/sumNumber.validator";
import { sumTopNDigits, sumAllDigits } from "../service/sumNumberService";

export const sumNumber = (req: Request, res: Response) => {
  if (!isValidBody(req.body)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { n, ch } = req.body;

  if (!isAllDigits(ch)) {
    return res
      .status(400)
      .json({ message: "Invalid input: ch must contain only digits" });
  }

  if (!isValidN(n)) {
    return res.status(400).json({ message: "n must be a positive integer" });
  }

  if (isNGreaterThanLength(ch, n)) {
    return res
      .status(400)
      .json({ message: "n cannot exceed the length of ch" });
  }

  if (isNEqualToLength(ch, n)) {
    const result = sumAllDigits(ch);
    return res.status(200).json({ data: result });
  } else {
    const result = sumTopNDigits(ch, n);
    return res.status(200).json({ data: result });
  }
};
