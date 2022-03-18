import conf from 'conf';
import chalk from 'chalk';

const config = new conf();

export const add = (x, y, orientation) => {
  const map = config.get('map');
  const rovers = config.get('rovers') ?? [];

  if (map) {
    const roverOnRoverAccident =
      rovers.length > 0 &&
      rovers.filter(({ position }) => position.x === Number(x) && position.y === Number(y)).length >
        0;

    if (roverOnRoverAccident) {
      console.log(
        chalk.red.bold(`Oh no! There\'s already a rover here, so, we didn\'t add another one`)
      );
    } else {
      const id = rovers.length + 1;
      rovers.push({
        id,
        position: {
          x: Number(x),
          y: Number(y),
          orientation
        },
        lost: Boolean(Number(x) < 0 || Number(y) < 0)
      });
      config.set('rovers', rovers);
      console.log(
        chalk.cyan.bold(`Rover id: ${id} added. Currently at ${x}, ${y} facing ${orientation}`)
      );
    }
  } else {
    console.log(chalk.red.bold(`Map not set. Run rover map first`));
  }
};
