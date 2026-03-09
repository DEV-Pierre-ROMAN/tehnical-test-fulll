/**
 *
 * @param {number} n - param named N in reference to the instruction of the test
 *
 * @returns {string[]}
 *
 */
export function fizzBuzz(n) {
  return Array.from({ length: n }, (_, i) => i + 1).map((number) => {
    let string = "";
    if (number % 3 === 0) {
      string += "Fizz";
    }

    if (number % 5 === 0) {
      string += "Buzz";
    }

    if (string.length === 0) return number;

    return string;
  });
}
