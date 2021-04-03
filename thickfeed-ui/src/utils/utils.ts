/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array<string>} array - The array to be shuffled
 * @returns An array of strings
 */
export const shuffle = (array: Array<JSX.Element>): Array<JSX.Element> => {
  const arr: Array<JSX.Element> = array;
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];

    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

export const formatUTC = (utc: number): string => {
  let quotient = Math.floor(utc / 86400);
  let unit = 'day';
  if (utc < 60) {
    quotient = utc;
    unit = 'second';
  }
  if (utc < 3600) {
    quotient = Math.floor(utc / 60);
    unit = 'minute';
  }
  if (utc < 86400) {
    quotient = Math.floor(utc / 3600);
    unit = 'hour';
  }
  if (quotient > 1) {
    unit = `${unit}s`;
  }
  return `${quotient} ${unit} ago`;
};
