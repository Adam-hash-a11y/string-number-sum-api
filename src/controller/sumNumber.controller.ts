import { Request, Response } from "express";
import {
  isValidN,
  isValidString,
  maxCompairedToStringLength,
  maxEqualToStringLength,
  testIsAllNumber,
} from "../validator/sumNumber.validator";
import {
  sumFinalNumber,
  sumWhenMaxEqualToStringLength,
} from "../service/sumNumberService";

export const sumNumber = (req: Request, res: Response): Response => {
  const { n, ch } = req.body;
  const isNumeric = testIsAllNumber(ch);
  const isValid = isValidString(ch);
  const isValidNumber = isValidN(n);

  const nBiggerThanStringLength = maxCompairedToStringLength(ch, n);
  if (!isValid) {
    return res
      .status(400)
      .json({ message: "Invalid input: Cannot accept empty String" });
  }
  if (!isNumeric) {
    return res
      .status(400)
      .json({ message: "Invalid input: ch must contain only digits" });
  }

  if (!isValidNumber) {
    return res.status(400).json({ message: "n must be a positive integer" });
  }
  if (nBiggerThanStringLength) {
    return res.status(400).json({ message: "n is bigger than string length" });
  }

  if (maxEqualToStringLength(ch, n)) {
    const result = sumWhenMaxEqualToStringLength(ch);
    return res.status(200).json({ data: result });
  } else {
    const result = sumFinalNumber(ch, n);
    return res.status(200).json({ data: result });
  }
};
