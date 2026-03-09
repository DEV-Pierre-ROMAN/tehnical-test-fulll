/**
 * @typedef {Object} conditionalPoint
 * @property {number} point
 * @property {string} label
 */

/**
 *
 * @param {conditionalPoint[]} conditionalPoints
 *
 * @return {function(number): string[]}
 *
 */
export function createParametricalFizzBuzz(conditionalPoints) {
  return (n) =>
    Array.from({ length: n }, (_, i) => i + 1).map((number) => {
      let string = "";
      for (const { point, label } of conditionalPoints) {
        if (number % point === 0) {
          string += label;
        }
      }

      if (string.length === 0) return number.toString();

      return string;
    });
}

/**
 *
 * @param {number} n - param named N in reference to the instruction of the test
 *
 * @returns {string[]}
 *
 */
export function fizzBuzz(n) {
  const CLASSICAL_FIZZBUZZ_CONDITIONNAL_POINT = [
    {
      point: 3,
      label: "Fizz",
    },
    {
      point: 5,
      label: "Buzz",
    },
  ];

  return createParametricalFizzBuzz(CLASSICAL_FIZZBUZZ_CONDITIONNAL_POINT)(n);
}
