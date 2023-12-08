/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  if (numbers.length == 0) {
    return undefined;
  } else {
    if (numbers.length == 1) {
      return numbers[0];
    }
    let largeNum = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > largeNum) {
        largeNum = numbers[i];
      }
    }
    return largeNum;
  }
}

module.exports = findLargestElement;
