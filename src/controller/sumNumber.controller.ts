import { Request, Response } from "express";
import {
  isValidBody,
  isAllDigits,
  isValidN,
  isNGreaterThanLength,
  isNEqualToLength,
} from "../validator/sumNumber.validator";
import {
  sumTopNDigits,
  sumAllDigits,
  sanitizeCh,
} from "../service/sumNumberService";
import { addCall } from "../types/data";
import {
  getAllCalls,
  getCallByInstance,
  getCallsByStatus,
} from "../service/trackService";
import { CallStatus } from "../types/track.types";
import { SumNumberBody } from "../types/sumNumber.types";

export const sumNumber = (req: Request, res: Response) => {
  if (!isValidBody(req.body)) {
    addCall({
      status: "failed",
      data: { n: req.body.n, ch: req.body.ch, result: null },
    });
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { n, ch, sanitize } = req.body as SumNumberBody;
  let cleanCh: string;
  if (sanitize === true) {
    cleanCh = sanitizeCh(ch);
  } else {
    cleanCh = ch;
  }
  if (!isAllDigits(cleanCh)) {
    addCall({ status: "failed", data: { n, ch, result: null } });
    return res
      .status(400)
      .json({ message: "Invalid input: ch must contain only digits" });
  }

  if (!isValidN(n)) {
    addCall({ status: "failed", data: { n, ch, result: null } });
    return res.status(400).json({ message: "n must be a positive integer" });
  }

  if (isNGreaterThanLength(cleanCh, n)) {
    addCall({ status: "failed", data: { n, ch, result: null } });
    return res
      .status(400)
      .json({ message: "n cannot exceed the length of ch" });
  }

  if (isNEqualToLength(ch, n)) {
    const result = sumAllDigits(cleanCh);
    return res.status(200).json({ data: result });
  } else {
    const result = sumTopNDigits(cleanCh, n);
    return res.status(200).json({ data: result });
  }
};

export const getCallsHistory = (req: Request, res: Response) => {
  const { status } = req.query as { status?: CallStatus };

  if (status) {
    if (status !== "success" && status !== "failed") {
      return res
        .status(400)
        .json({ message: "status must be success or failed" });
    }
    const result = getCallsByStatus(status);
    return res.status(200).json(result);
  }

  return res.status(200).json(getAllCalls());
};

export const getCallById = (req: Request<{ id: number }>, res: Response) => {
  const result = getCallByInstance(req.params.id);


  if (!result) {
    return res.status(404).json({ message: "call id not found" });
  }

  return res.status(200).json(result);
};
