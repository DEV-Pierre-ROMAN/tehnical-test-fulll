import { describe, expect, it } from "vitest";
import { fizzBuzz, createParametricalFizzBuzz } from "./fizzbuzz";

describe("fizzBuzz()", () => {
  it.each([
    {
      testName: "classic fizzbuzz index",
      value: 3,
      checkIndex: 1,
      valueExpected: "2",
    },
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

describe("createParametrableFizzBuzz()", () => {
  it.each([
    {
      testName: "parametrical fizzbuzz classic param index",
      value: 3,
      checkIndex: 1,
      valueExpected: "2",
      conditionalPoints: [
        {
          point: 3,
          label: "Fizz",
        },
        {
          point: 5,
          label: "Buzz",
        },
      ],
    },
    {
      testName: "parametrical fizzbuzz classic param divide by 3",
      value: 3,
      checkIndex: 2,
      valueExpected: "Fizz",
      conditionalPoints: [
        {
          point: 3,
          label: "Fizz",
        },
        {
          point: 5,
          label: "Buzz",
        },
      ],
    },
    {
      testName: "parametrical fizzbuzz classic param divide by 5",
      value: 5,
      checkIndex: 4,
      valueExpected: "Buzz",
      conditionalPoints: [
        {
          point: 3,
          label: "Fizz",
        },
        {
          point: 5,
          label: "Buzz",
        },
      ],
    },
    {
      testName: "parametrical fizzbuzz classic param by 3 and by 5",
      value: 15,
      checkIndex: 14,
      valueExpected: "FizzBuzz",
      conditionalPoints: [
        {
          point: 3,
          label: "Fizz",
        },
        {
          point: 5,
          label: "Buzz",
        },
      ],
    },

    {
      testName: "parametrical fizzbuzz BuzzFizz param by 3 and by 5",
      value: 15,
      checkIndex: 14,
      valueExpected: "BuzzFizz",
      conditionalPoints: [
        {
          point: 5,
          label: "Buzz",
        },
        {
          point: 3,
          label: "Fizz",
        },
      ],
    },
    {
      testName: "parametrical fizzbuzz toto param by 10",
      value: 10,
      checkIndex: 9,
      valueExpected: "toto",
      conditionalPoints: [
        {
          point: 10,
          label: "toto",
        },
      ],
    },
  ])("$testName", ({ conditionalPoints, value, checkIndex, valueExpected }) => {
    expect(
      createParametricalFizzBuzz(conditionalPoints)(value)[checkIndex],
    ).toBe(valueExpected);
  });
});
