# Multiverse Rover CLI

Command one or more rovers on Mars on a 2d map with string based commands.

## Install

Checkout repo and install globally with:

```
npm i -g
```
## How to use

Run `rover --help` to get a run down of all commands available.

| Command   |      Arguments      |  Description |
|----------|:-------------:|------:|
| map |  `<m> <n>` | Set map size (m x n) |
| add |    `<x> <y> <orientation>`   | Spawn a new rover at (x, y, orientation). Orientation expects: N, E, S, or W |
| move | `<id> <command>` | Move your rover by id and commands: F moves forward one space, L rotates by 90 degrees left and R rotates by 90 degrees right. Example command: LFRFF |
| list | | List all rovers, lost or not |
| clear | | Clear map, rover, everything |

## Examples

```
rover map 4 8
=> map generated: 32
rover add 2 3 E
=> Rover id: 1 added. Currently at 2, 3 facing E
rover move 1 LFRFF
=> Rover 1 at (4, 4, E)
```
