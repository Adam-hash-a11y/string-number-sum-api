import { Request, Response } from "express";
import {  processSum } from "../service/sumNumberService";
import { SumNumberBody } from "../types/sumNumber.types";

export const sumNumber = async (
  req: Request<{ id: number | string }>,
  res: Response,
) => {
  const result = await processSum(req.body as SumNumberBody);
  return res.status(200).json({ data: result });
};


