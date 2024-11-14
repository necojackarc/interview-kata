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
      this.position = position;
      this.direction = direction;
      this.plateau = plateau;
  }

  move(command: Command) {
    const currentDirectionIndex = this.directions.indexOf(this.direction);

    let nextDirectionIndex = currentDirectionIndex;

    if (command === 'L') {
      nextDirectionIndex = (this.directions.length + currentDirectionIndex - 1) % this.directions.length;
    } else if (command == 'R') {
      nextDirectionIndex = (this.directions.length + currentDirectionIndex + 1) % this.directions.length;
    }

    this.direction = this.directions[nextDirectionIndex];
  }
}


export function main(input: string[]): string[] {
  // TODO: Implement
}
