/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { createCallLog } from "../service/callLogService";
import { CallLog, CallStatus } from "../types/callLog.types";

export const callLogMiddleware = async (
  req: Request<{ id: number | string }>,
  res: Response,
  next: NextFunction,
) => {
  let capturedResult: any = null;

  const originalJson = res.json.bind(res);

  res.json = (body: any) => {
    capturedResult = body?.data ?? null;
    return originalJson(body);
  };

  res.on("finish", async () => {
    let status: CallStatus;

    if (res.statusCode == 200) {
      status = "success";
    } else {
      status = "failed";
    }

    const log: CallLog = {
      status,
      data: {
        ch: req.body.ch,
        n: req.body.n,
        sanitize: req.body.sanitize,
        result: capturedResult,
      },
    };

    await createCallLog(log);
  });

  next();
};
