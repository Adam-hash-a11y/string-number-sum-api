// src/service/callLog.service.ts
import {
  saveCallLog,
  findAllCallLogs,
  findCallLogById,
  findCallLogsByStatus,
} from "../repository/callLog.repository";
import { CallStatus, CallLog } from "../types/callLog.types";

export const createCallLog = async (data: CallLog) => {
  return await saveCallLog(data);
};

export const getAllCallLogs = async () => {
  return await findAllCallLogs();
};

export const getCallLogById = async (id: number) => {
  return await findCallLogById(id);
};

export const getCallLogsByStatus = async (status: CallStatus) => {
  return await findCallLogsByStatus(status);
};
