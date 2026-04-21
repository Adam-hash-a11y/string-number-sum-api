import validator from "validator";
import { SumNumberBody } from "../types/sumNumber.types";

export const isValidBody = (body: SumNumberBody): boolean => {
  for (const key of Object.keys(body)) {
    if (key !== "ch" && key !== "n") return false;
  }
  if (
    body.ch === undefined ||
    body.ch === null ||
    body.ch === "" ||
    body.n === undefined ||
    body.n === null
  ) {
    return false;
  }
  return true;
};

export const isAllDigits = (ch: string): boolean => {
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
  return validator.isInt(String(n)) && n > 0;
};
