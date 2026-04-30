export type CallStatus = "success" | "failed";

export type ApiCall = {
  callInstance?: number;
  status: CallStatus;
  data: {
    n: number;
    ch: string;
    result: number | null;
  };
};
