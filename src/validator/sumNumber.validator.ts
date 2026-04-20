import validator from "validator";
export const testIsAllNumber = (ch: string): boolean => {
  let i = 0;
  while (i < ch.length && ch[i] >= "0" && ch[i] <= "9") {
    i++;
  }
  return i >= ch.length;
};

export const maxCompairedToStringLength = (ch: string, n: number): boolean => {
  return n > ch.length;
};

export const maxEqualToStringLength = (ch: string, n: number): boolean => {
  return ch.length === n;
};

export const isValidString = (ch: string): boolean => {
  if (ch === undefined || ch === null || ch === "") {
    return false;
  }
  return true;
};

export const isValidN = (n: number): boolean => {
  return validator.isInt(String(n)) && n > 0;
};
