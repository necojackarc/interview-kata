'use strict';

export interface Position {
    x: number;
    y: number;
}

export interface Plateau {
    maxX: number;
    maxY: number;
}

export type Direction = 'N' | 'E' | 'S' | 'W';

export type Command = 'M' | 'L' | 'R';

export class Rover {
    public position: Position;
    public direction: Direction;
    private plateau: Plateau;

    // Used to determine the next direction internally
    private directions: Direction[] = ['N', 'E', 'S', 'W'];

    constructor(position: Position, direction: Direction, plateau: Plateau) {
        this.position = { ...position }; // Clone an object to avoid side effect on the original object
        this.direction = direction;
        this.plateau = plateau;
  }

    move(command: Command) {
        if (command === 'L') {
            this.direction = this.turnToLeft();
        } else if (command === 'R') {
            this.direction = this.turnToRight();
        } else if (command === 'M') {
            this.position = this.moveForward();
        } else {
            throw new Error(`Unexpected command ${command} is provided`);
        }
    }

    private turnToRight(): Direction {
        const currentDirectionIndex = this.directions.indexOf(this.direction);
        const nextDirectionIndex = (this.directions.length + currentDirectionIndex + 1) % this.directions.length;
        return this.directions[nextDirectionIndex]
    }

    private turnToLeft(): Direction {
        const currentDirectionIndex = this.directions.indexOf(this.direction);
        const nextDirectionIndex = (this.directions.length + currentDirectionIndex - 1) % this.directions.length;
        return this.directions[nextDirectionIndex]
    }

    private moveForward(): Position {
        const currentPosition = { ...this.position };

        if (this.direction === 'N') {
            if (currentPosition.y < this.plateau.maxY) {
                currentPosition.y += 1;
            }
        } else if (this.direction === 'E') {
            if (currentPosition.x < this.plateau.maxX) {
                currentPosition.x += 1;
            }
        } else if (this.direction === 'S') {
            if (currentPosition.y > 0) {
                currentPosition.y -= 1;
            }
        } else if (this.direction === 'W') {
            if (currentPosition.x > 0) {
                currentPosition.x -= 1;
            }
        } else {
            throw new Error('Rover is facing to the unexpected direction');
        }

        return currentPosition;
    }
}

export function main(input: string[]): string[] {
    const rawPlateau = input[0].split(' ');

    const plateau = {
        maxX: Number(rawPlateau[0]),
        maxY: Number(rawPlateau[1]),
    } as Plateau;

    const rovers: Rover[] = [];

    for(let i = 1; i < input.length; i += 2) {
        const rawPositionAndDirection = input[i].split(' ');

        const position = {
            x: Number(rawPositionAndDirection[0]),
            y: Number(rawPositionAndDirection[1]),
        } as Position;
        const direction = rawPositionAndDirection[2] as Direction;

        const commands = input[i + 1].split('') as Command[];

        const rover = new Rover(
            position,
            direction,
            plateau
        );

      commands.forEach((command) => {
          rover.move(command);
      })

      rovers.push(rover);
  }

  return rovers.map((rover) => (`${rover.position.x} ${rover.position.y} ${rover.direction}`));
}
