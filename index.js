#! /usr/bin/env node

import { program } from 'commander';
import { map } from './commands/map.js';
import { clear } from './commands/clear.js';
import { add } from './commands/add.js';
import { list } from './commands/list.js';
import { move } from './commands/move.js';
import { egg } from './commands/egg.js';

// Map command
program.command('map <m> <n>').description('Set map size (m x n)').action(map);

// Add command
program
  .command('add <x> <y> <orientation>')
  .description('Spawn a new rover at (x, y, orientation)')
  .action(add);

// Move command
program
  .command('move <id> <command>')
  .description(
    'Move your rover by id and commands: F moves forward one space, L rotates by 90 degrees left and R rotates by 90 degrees right. Example command: LFRFF'
  )
  .action(move);

// List command
program.command('list').description('List all rovers, lost or not').action(list);

// Clear command
program.command('clear').description('Clear map, rover, everything').action(clear);

// Easter egg command
program.command('egg <numbers>').description('Easter egg for finding the missing number in an array of unsorted numbers').action(egg);

program.parse();
