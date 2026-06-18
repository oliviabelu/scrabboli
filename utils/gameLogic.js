export function checkConsecutiveNumbers(numbers) {
  const sortedNumbers = [...numbers].map(Number).sort((a, b) => a - b);
  for (let index = 1; index < sortedNumbers.length; index++) {
    if (sortedNumbers[index] - sortedNumbers[index - 1] !== 1) {
      return false;
    }
  }
  return true;
}
