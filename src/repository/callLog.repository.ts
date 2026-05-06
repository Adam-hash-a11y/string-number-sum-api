// src/repositories/callLog.repository.ts
import { CallLogModel } from "../model/callLog.model";
import { CallStatus, CallLog } from "../types/callLog.types";

export const saveCallLog = async (data: CallLog) => {
  try {
    const count = await CallLogModel.countDocuments();
    const doc = new CallLogModel({ ...data, callInstance: count + 1 });
    return await doc.save();
  } catch (error) {
    throw new Error("Error saving call log:", { cause: error });
  }
};

export const findAllCallLogs = async () => {
  return await CallLogModel.find();
};

export const findCallLogById = async (id: number) => {
  return await CallLogModel.findOne({ callInstance: id });
};

export const findCallLogsByStatus = async (status: CallStatus) => {
  return await CallLogModel.find({ status });
};
