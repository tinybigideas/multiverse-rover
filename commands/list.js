import conf from 'conf';
import chalk from 'chalk';

const config = new conf();

export const list = () => {
  const rovers = config.get('rovers') ?? [];

  if (rovers.length > 0) {
    rovers.forEach(({ id, position, lost }) =>
      console.log(
        chalk.green(
          `Rover id: ${id} currently at (${position.x}, ${position.y}) facing ${position.orientation} ${
            lost ? ', but is unfortunately lost :(' : ''
          }`
        )
      )
    );
  } else {
    console.log(chalk.red.bold(`No little rovers running around right now. Go ahead and add one`));
  }
};
