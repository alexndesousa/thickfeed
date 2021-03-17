/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array} array - The array to be shuffled
 * @returns An array
 */
const shuffle = (array) => {
  const arr = array;
  let currentIndex = arr.length; let temporaryValue; let
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];

    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

module.exports = {
  shuffle,
};
