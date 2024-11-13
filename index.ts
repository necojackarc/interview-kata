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

export class Rover {
  public position: Position;
  public direction: Direction;
  private plateau: Plateau;

  constructor(position: Position, direction: Direction, plateau: Plateau) {
      this.position = position;
      this.direction = direction;
      this.plateau = plateau;
  }
}


export function main(input: string[]): string[] {
  // TODO: Implement
}
