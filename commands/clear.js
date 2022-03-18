import conf from 'conf';
import chalk from 'chalk';

const config = new conf();

const reasons = [
  'Mars has been completed destroyed by an asteroid. Poor little rovers...',
  'Cleared. All gone. Bye bye rovers.',
  'Cleared. Damn. Poor little guys, he was almost there.',
  'Cleared. That was fun? Maybe? Oh well'
];

export const clear = () => {
  config.clear();
  const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
  console.log(chalk.magenta.bold(randomReason));
};
