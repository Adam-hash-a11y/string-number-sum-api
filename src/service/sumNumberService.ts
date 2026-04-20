export const sumFinalNumber = (ch: string, max: number): number => {
  let remaining = ch;
  let sum = 0;

  for (let i = 0; i < max; i++) {
    const temp = getMaxFromString(remaining);
    sum += temp;
    remaining = removeMax(remaining, temp);
  }

  return sum;
};

export const sumWhenMaxEqualToStringLength = (
  ch: string,
  max: number,
): number => {
  let sumMax = 0;
  for (const element of ch) {
    sumMax += Number(element);
  }
  return sumMax;
};

export const getMaxFromString = (ch: string): number => {
  let max = Number(ch[0]);
  for (const element of ch) {
    if (Number(element) > max) {
      max = Number(element);
    }
  }
  return max;
};

export const removeMax = (ch: string, max: number): string => {
  return ch.replace(String(max), "");
};
