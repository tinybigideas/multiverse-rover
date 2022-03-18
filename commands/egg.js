import chalk from 'chalk';

// Example: rover egg 1,2,3,4,5,6,7,8,9,10,11,12,14,15
// That interview question bothered me that I didn't have an elegant solution.
// Here's my stab at it below. I haven't seen it done in this way, but a shower thought helped me
// figure it out. Doesn't work for start or end missing numbers, but I find the solution interesting!

export const egg = (arrayStr) => {
  const sortNumbers = (a, b) => a - b;
  const testArray = String(arrayStr).split(',').map((item) => Number(item.trim())).sort(sortNumbers);
  const missingNumber = testArray.find((item, index, array) => array[0] === 1 ? (index + 1 !== item) : (array[0] + index !== item)) - 1;
  console.log(chalk.cyan.bold(`Missing number: ${missingNumber}`))
};
