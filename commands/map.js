import conf from 'conf';
import chalk from 'chalk';

const config = new conf();

export const map = (x, y) => {
  const mapSize = x * y;
  config.set('map', { x, y });
  console.log(chalk.magenta.bold(`Map generated: ${mapSize}`));
};
