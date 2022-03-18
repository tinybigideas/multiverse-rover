import conf from 'conf';
import chalk from 'chalk';

const config = new conf();

const commands = {
  FORWARD: 'F',
  LEFT: 'L',
  RIGHT: 'R'
};
const directions = {
  NORTH: 'N',
  EAST: 'E',
  SOUTH: 'S',
  WEST: 'W'
};

const directionsArray = Object.values(directions);

export const move = (roverId, moveCommand) => {
  const map = config.get('map');

  if (map) {
    const rovers = config.get('rovers') ?? [];
    const rover = _findRoverById(rovers, roverId);

    if (rover) {
      const commandsArray = String(moveCommand).split('');

      commandsArray.forEach((command) => {
        const updatedRover = _findRoverById(rovers, roverId);

        if (command === commands.FORWARD) {
          _moveRoverForward(map, updatedRover);
        } else if ([commands.LEFT, commands.RIGHT].includes(command)) {
          _rotateRover(updatedRover, command);
        } else {
          console.log(chalk.red.bold(`Invalid command ${command}`));
        }
      });

      const newRover = _findRoverById(rovers, roverId);

      console.log(
        chalk.blueBright.bold(
          `Rover ${newRover.id} at (${newRover.position.x}, ${newRover.position.y}, ${
            newRover.position.orientation
          })${newRover.lost ? ' LOST :(' : ''}`
        )
      );
    } else {
      console.log(
        chalk.red.bold(`No rover found with id: ${roverId}. Are you sure you have the right id?`)
      );
    }
  } else {
    console.log(chalk.red.bold(`Map not set. Run rover map first`));
  }
};

const _moveRoverForward = (map, rover) => {
  const { x, y, orientation } = rover.position;
  const isYAxis = [directions.NORTH, directions.SOUTH].includes(orientation);
  const isXAxis = [directions.EAST, directions.WEST].includes(orientation);
  const moveY = orientation === directions.NORTH ? y + 1 : y - 1;
  const moveX = orientation === directions.EAST ? x + 1 : x - 1;

  const newRoverPosition = {
    x: isXAxis ? moveX : x,
    y: isYAxis ? moveY : y,
    orientation
  };
  rover.lost = Boolean(
    newRoverPosition.x > map.x ||
      newRoverPosition.x < 0 ||
      newRoverPosition.y > map.y ||
      newRoverPosition.y < 0
  );

  _updateRoverInList({ ...rover, position: newRoverPosition });
};

const _rotateRover = (rover, rotation) => {
  const currentDirectionIndex = directionsArray.findIndex(
    (direction) => rover.position.orientation === direction
  );

  rover.position.orientation =
    rotation === commands.RIGHT
      ? directionsArray[
          currentDirectionIndex === directionsArray.length - 1 ? 0 : currentDirectionIndex + 1
        ]
      : directionsArray[
          currentDirectionIndex === 0 ? directionsArray.length - 1 : currentDirectionIndex - 1
        ];

  _updateRoverInList(rover);
};

const _updateRoverInList = (rover) => {
  const rovers = [...(config.get('rovers') ?? [])];
  const index = rovers.findIndex(({ id }) => rover.id === Number(id));
  rovers[index] = rover;
  config.set('rovers', rovers);
};

const _findRoverById = (rovers, roverId) => {
  return (config.get('rovers') ?? []).find((r) => r.id === Number(roverId));
};
