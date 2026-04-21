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
