import { ApiCall } from "../types/track.types";

export const callsHistory: ApiCall[] = [];
let callCounter = 0;

export const addCall = (call: ApiCall): void => {
  callCounter++;
  callsHistory.push({ ...call, callInstance: callCounter });
};
