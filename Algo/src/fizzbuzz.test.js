import { describe, expect, it } from "vitest";
import { fizzBuzz } from "./fizzbuzz";

describe("fizzBuzz()", () => {
  it.each([
    {
      testName: "classic fizzbuzz divide by 3",
      value: 3,
      checkIndex: 2,
      valueExpected: "Fizz",
    },
    {
      testName: "classic fizzbuzz divide by 5",
      value: 5,
      checkIndex: 4,
      valueExpected: "Buzz",
    },
    {
      testName: "classic fizzbuzz divide by 3 and by 5",
      value: 15,
      checkIndex: 14,
      valueExpected: "FizzBuzz",
    },
  ])("$testName", ({ value, checkIndex, valueExpected }) => {
    expect(fizzBuzz(value)[checkIndex]).toBe(valueExpected);
  });
});
