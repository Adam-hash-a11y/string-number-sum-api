import {
  sumTopNDigits,
  sumAllDigits,
  getMaxDigit,
  removeDigit,
  processSum,
} from "../../src/service/sumNumberService";

jest.mock("../../src/repository/sum.repository");

describe("test sumAllDigits funtion", () => {
  it("should return sum of top N digits when n is smaller than string length", async () => {
    // Given
    const data = {
      ch: "123456",
      n: 3,
      sanitize: false,
    };

    // When
    const result = await processSum(data);

    // Then
    expect(result).toBe(15);
  });

  it("should return  the sum of all number when given a valid string", () => {
    //Given
    const ch = "123";

    //When
    const result = sumAllDigits(ch);

    //Then

    expect(result).toBe(6);
  });

  it("should return the digit it self when given a single string digit", () => {
    //Given
    const ch = "5";

    //When
    const result = sumAllDigits(ch);

    //Then
    expect(result).toBe(5);
  });
});

describe("test sumTopNDigits function", () => {
  it("should return the sum of top N digits", () => {
    //Given
    const ch = "12345";
    const n = 2;

    //When
    const result = sumTopNDigits(ch, n);

    //Then
    expect(result).toBe(9);
  });

  it("should return the largest digit when n is 1", () => {
    // Given
    const ch = "123456";
    const n = 1;

    // When
    const result = sumTopNDigits(ch, n);

    // Then
    expect(result).toBe(6);
  });
});

describe("test getMaxDigit function", () => {
  it("should return the largest digit in the given string", () => {
    //Given
    const ch = "1234956";

    //When
    const result = getMaxDigit(ch);

    //Then
    expect(result).toBe(9);
  });
});

describe("test removeDigit function", () => {
  it("should remove the first occurence of the digit in the given string", () => {
    //Given
    const ch = "1234596";
    const digit = 9;

    //When
    const result = removeDigit(ch, digit);

    //Then
    expect(result).toBe("123456");
  });
  it("should only remove the first occurrence when digit appears multiple times", () => {
    // Given
    const ch = "123953";
    const digit = 3;

    // When
    const result = removeDigit(ch, digit);

    // Then
    expect(result).toBe("12953");
  });

  it("should return the given string if the digit doesn't exist in it", () => {
    //Given
    const ch = "123953";
    const digit = 8;

    //When
    const result = removeDigit(ch, digit);

    //Then
    expect(result).toBe("123953");
  });
});
