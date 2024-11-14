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

    /**
     * Move or turn the rover for the given command.
     * @param command Command
     */
    move(command: Command): void {
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

    private canMoveForward(): boolean {
        if (this.direction === 'N' && this.position.y === this.plateau.maxY) {
            return false;
        }

        if (this.direction === 'S' && this.position.y === 0) {
            return false;
        }

        if (this.direction === 'E' && this.position.x === this.plateau.maxX) {
            return false;
        }

        if (this.direction === 'W' && this.position.x === 0) {
            return false;
        }

        return true;
    }

    private moveForward(): Position {
        const nextPosition = { ...this.position };

        if (!this.canMoveForward()) {
            return nextPosition;
        }

        if (this.direction === 'N') {
            nextPosition.y += 1;
        } else if (this.direction === 'E') {
            nextPosition.x += 1;
        } else if (this.direction === 'S') {
            nextPosition.y -= 1;
        } else if (this.direction === 'W') {
            nextPosition.x -= 1;
        } else {
            throw new Error('Rover is facing to an unexpected direction');
        }

        return nextPosition;
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
