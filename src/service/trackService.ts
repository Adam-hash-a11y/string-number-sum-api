import { callsHistory } from "../types/data";
import { CallStatus } from "../types/track.types";

export const getAllCalls = () => {
  return callsHistory;
};

export const getCallByInstance = (id: number) => {
  return callsHistory.find((call) => call.callInstance === id);
};

export const getCallsByStatus = (status: CallStatus) => {
  return callsHistory.filter((call) => call.status === status);
};
