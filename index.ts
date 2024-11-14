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

  private directions: Direction[] = ['N', 'E', 'S', 'W'];

  constructor(position: Position, direction: Direction, plateau: Plateau) {
      this.position = { ...position };
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
      currentPosition.y += 1;
    } else if (this.direction === 'E') {
      currentPosition.x += 1;
    } else if (this.direction === 'S') {
      currentPosition.y -= 1;
    } else if (this.direction === 'W') {
      currentPosition.x -= 1;
    } else {
      throw new Error('Rover is facing to the unexpected direction');
    }

    return currentPosition;
  }
}


export function main(input: string[]): string[] {
  // TODO: Implement
}
