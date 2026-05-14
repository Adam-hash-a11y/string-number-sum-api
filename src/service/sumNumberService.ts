import { saveSum } from "../repository/sum.repository";
import { SumNumberBody } from "../types/sumNumber.types";

export const sumTopNDigits = (ch: string, n: number): number => {
  let remaining = ch;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const max = getMaxDigit(remaining);
    sum += max;
    remaining = removeDigit(remaining, max);
  }

  return sum;
};

export const sumAllDigits = (ch: string): number => {
  let sum = 0;
  for (const digit of ch) {
    sum += Number(digit);
  }
  return sum;
};

export const getMaxDigit = (ch: string): number => {
  let max = Number(ch[0]);
  for (const digit of ch) {
    if (Number(digit) > max) max = Number(digit);
  }
  return max;
};

export const removeDigit = (ch: string, digit: number): string => {
  return ch.replace(String(digit), "");
};

export const sanitizeCh = (ch: string): string => {
  return ch.replaceAll(/\s/g, "");
};

export const processSum = async (data: SumNumberBody): Promise<number> => {
  let cleanCh: string;

  if (data.sanitize === true) {
    cleanCh = sanitizeCh(data.ch);
  } else {
    cleanCh = data.ch;
  }

  let result: number;

  if (cleanCh.length === data.n) {
    result = sumAllDigits(cleanCh);
  } else {
    result = sumTopNDigits(cleanCh, data.n);
  }

  await saveSum(data);

  return result;
};

