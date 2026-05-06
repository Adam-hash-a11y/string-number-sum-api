import { CallStatus } from "../types/callLog.types";
import { SumNumberBody } from "../types/sumNumber.types";

export const isValidBody = (body: unknown): boolean => {
  if (typeof body !== "object" || body === null) return false;

  for (const key of Object.keys(body)) {
    if (key !== "ch" && key !== "n" && key !== "sanitize") return false;
  }

  const { ch, n, sanitize } = body as SumNumberBody;

  if (ch === undefined || ch === null || ch === "") return false;
  if (n === undefined || n === null) return false;
  if (sanitize !== undefined && typeof sanitize !== "boolean") return false;

  return true;
};

export const isAllDigits = (ch: string): boolean => {
  if (ch.length === 0) return false;
  let i = 0;
  while (i < ch.length && ch[i] >= "0" && ch[i] <= "9") {
    i++;
  }
  return i >= ch.length;
};

export const isNGreaterThanLength = (ch: string, n: number): boolean => {
  return n > ch.length;
};

export const isNEqualToLength = (ch: string, n: number): boolean => {
  return ch.length === n;
};

export const isValidN = (n: number): boolean => {
  return Number.isInteger(n) && n > 0;
};

export const isAPositiveNumber = (value: string): boolean => {
  const num = Number(value);

  return Number.isInteger(num) && num > 0;
};

export const isValidStatus = (status: CallStatus): boolean => {
  if (typeof status !== "string") return false;

  return status === "success" || status === "failed";
};
