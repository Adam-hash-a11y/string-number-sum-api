export type CallStatus = "success" | "failed";

export type CallLog = {
  callInstance?: number;
  status: CallStatus;
  data: {
    n: number;
    ch: string;
    sanitize?: boolean
    result: number | null;
  };
};
