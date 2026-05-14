/* eslint-disable @typescript-eslint/no-explicit-any */
import { SumNumberBody } from "../../src/types/sumNumber.types";
import {
  isValidBody,
  isAllDigits,
  isNGreaterThanLength,
  isNEqualToLength,
  isValidN,
  isValidStatus,
} from "../../src/validator/sumNumber.validator";

describe("test isValidBody validator function", () => {
  it("should true if the given body have validch and n properties", () => {
    //Given
    const body = { ch: "123", n: 1 };

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeTruthy();
  });
  it("should false if the given body have extra properties", () => {
    //Given
    const body = { ch: "123", n: 1, a: 44 };

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });
  it("should false if the given body is missing ch property", () => {
    //Given
    const body = { n: 1 } as SumNumberBody;
    //Type assertion used to Bypass Typescript checks for testing invalid input

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });

  it("should false if the given body is missing n property", () => {
    //Given
    const body = { ch: "12345" } as SumNumberBody;
    //Type assertion used to Bypass Typescript checks for testing invalid input

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });

  it("should false if the given body dosen't have ch nor n propreties", () => {
    //Given
    const body: any = { aa: 4, x: "a" };
    //Type any used to Bypass Typescript checks for testing invalid input

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });
  it("should false if the given body is empty", () => {
    //Given
    const body: any = {};
    //Type any used to Bypass Typescript checks for testing invalid input

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("test isAllDigits validator function", () => {
  it("should return true if the given string contains only numeric characters", () => {
    //Given
    const ch = "12345";

    //When
    const result = isAllDigits(ch);

    //Then
    expect(result).toBeTruthy();
  });
  it("should return false if the given string contains at least one non-numeric characters", () => {
    //Given
    const ch = "123a45";

    //When
    const result = isAllDigits(ch);

    //Then
    expect(result).toBeFalsy();
  });
  it("should return false if the given string is empty", () => {
    //Given
    const ch = "";

    //When
    const result = isAllDigits(ch);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("test isNGreaterThanLength validator function", () => {
  test("should return true if given n is bigger than string length", () => {
    //Given
    const ch = "12345";
    const n = 9;

    //When
    const result = isNGreaterThanLength(ch, n);

    //Then
    expect(result).toBeTruthy();
  });
  test("should return false if given n is smaller than string length", () => {
    //Given
    const ch = "12345";
    const n = 3;

    //When
    const result = isNGreaterThanLength(ch, n);

    //Then
    expect(result).toBeFalsy();
  });
  test("should return false if given n is equal to string length", () => {
    //Given
    const ch = "12345";
    const n = 5;

    //When
    const result = isNGreaterThanLength(ch, n);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("test isNEqualToLength validator function", () => {
  it("should return true if string length is stricly equal to given n", () => {
    //Given
    const ch = "12345";
    const n = 5;

    //When
    const result = isNEqualToLength(ch, n);

    //Then
    expect(result).toBeTruthy();
  });

  it("should return false if string length is not equal to n", () => {
    //Given
    const ch = "12345";
    const n = 2;

    //When
    const result = isNEqualToLength(ch, n);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("test isValidN validator function", () => {
  it("should return true if the given number is a positive integer", () => {
    //Given
    const n = 5;

    //When
    const result = isValidN(n);

    //Then
    expect(result).toBeTruthy();
  });

  it("should return false if the given number is not a positive integer", () => {
    //Given
    const n = -5;

    //When
    const result = isValidN(n);

    //Then
    expect(result).toBeFalsy();
  });

  it("should return false if the given number is a string", () => {
    //Given
    const n: any = "5";

    //When
    const result = isValidN(n);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("isValidStatus", () => {
  it("should return true when status is success", () => {
    // Given
    const status = "success";

    // When
    const result = isValidStatus(status);

    // Then
    expect(result).toBe(true);
  });

  it("should return true when status is failed", () => {
    // Given
    const status = "failed";

    // When
    const result = isValidStatus(status);

    // Then
    expect(result).toBe(true);
  });

  it("should return false when status is invalid string", () => {
    // Given
    const status = "pending";

    // When
    const result = isValidStatus(status as any);

    // Then
    expect(result).toBe(false);
  });

  it("should return false when status is not a string", () => {
    // Given
    const status = 123;

    // When
    const result = isValidStatus(status as any);

    // Then
    expect(result).toBe(false);
  });
});
