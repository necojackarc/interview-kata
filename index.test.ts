import { main, Position, Plateau, Direction, Command, Rover } from './index';

describe('Rover', () => {
    let rover: Rover;

    const position: Position = { x: 1, y: 2 };
    const direction: Direction = 'N';
    const plateau = { maxX: 5, maxY: 5 };

    beforeEach(() => {
        rover = new Rover(position, direction, plateau);
    });

    test("Rover returns its position ", () => {
        expect(rover.position).toEqual(position);
    });

    test("Rover returns its direction ", () => {
        expect(rover.direction).toEqual(direction);
    });

    test("Rover turns to left", () => {
        const command: Command = 'L';
        rover.move(command);
        expect(rover.direction).toEqual('W');
    })

    test("Rover turns to left twice", () => {
        const command: Command = 'L';
        rover.move(command);
        rover.move(command);
        expect(rover.direction).toEqual('S');
    })

    test("Rover turns to left three times", () => {
        const command: Command = 'L';
        rover.move(command);
        rover.move(command);
        rover.move(command);
        expect(rover.direction).toEqual('E');
    })

    test("Rover turns to left four times", () => {
        const command: Command = 'L';
        rover.move(command);
        rover.move(command);
        rover.move(command);
        rover.move(command);
        expect(rover.direction).toEqual('N');
    })

    test("Rover turns to right", () => {
        const command: Command = 'R';
        rover.move(command);
        expect(rover.direction).toEqual('E');
    })

    test("Rover turns to right twice", () => {
        const command: Command = 'R';
        rover.move(command);
        rover.move(command);
        expect(rover.direction).toEqual('S');
    })

    test("Rover turns to right three times", () => {
        const command: Command = 'R';
        rover.move(command);
        rover.move(command);
        rover.move(command);
        expect(rover.direction).toEqual('W');
    })

    test("Rover turns to right four times", () => {
        const command: Command = 'R';
        rover.move(command);
        rover.move(command);
        rover.move(command);
        rover.move(command);
        expect(rover.direction).toEqual('N');
    })

    test("Rover moves up when rover faces to the north", () => {
        const command: Command = 'M';
        rover.move(command);
        expect(rover.position).toEqual({ x: 1, y: 3 });
    })

    test("Rover moves right when rover faces to the east", () => {
        rover.move('R');
        expect(rover.direction).toEqual('E');

        const command: Command = 'M';
        rover.move(command);
        expect(rover.position).toEqual({ x: 2, y: 2 });
    })

    test("Rover moves down when rover faces to the south", () => {
        rover.move('R');
        rover.move('R');
        expect(rover.direction).toEqual('S');

        const command: Command = 'M';
        rover.move(command);
        expect(rover.position).toEqual({ x: 1, y: 1 });
    })

    test("Rover moves left when rover faces to the west", () => {
        rover.move('L');
        expect(rover.direction).toEqual('W');

        const command: Command = 'M';
        rover.move(command);
        expect(rover.position).toEqual({ x: 0, y: 2 });
    })

    test("Rover does not move beyond the upper edge of the plateau", () => {
        for (let i = 0; i < plateau.maxY + 1; i++) {
            rover.move('M');
        }
        expect(rover.position).toEqual({ x: 1, y: 5 });
    })

    test("Rover does not move beyond the bottom edge of the plateau", () => {
        rover.move('R');
        rover.move('R');
        expect(rover.direction).toEqual('S');

        for (let i = 0; i < plateau.maxY + 1; i++) {
            rover.move('M');
        }
        expect(rover.position).toEqual({ x: 1, y: 0 });
    });

    test("Rover does not move beyond the right edge of the plateau", () => {
        rover.move('R');
        expect(rover.direction).toEqual('E');

        for (let i = 0; i < plateau.maxX + 1; i++) {
            rover.move('M');
        }
        expect(rover.position).toEqual({ x: 5, y: 2 });
    })

    test("Rover does not move beyond the left edge of the plateau", () => {
        rover.move('L');
        expect(rover.direction).toEqual('W');

        for (let i = 0; i < plateau.maxX + 1; i++) {
            rover.move('M');
        }
        expect(rover.position).toEqual({ x: 0, y: 2 });
    })

});

// test("Example - Single Rover Pattern 1", () => {
//     const input = [
//         '5 5',
//         '1 2 N',
//         'LMLMLMLMM',
//     ]
//
//     const expected = ['1 3 N'];
//
//     expect(main(input)).toEqual(expected);
// })
//
// test("Example - Single Rover Pattern 2", () => {
//     const input = [
//         '5 5',
//         '3 3 E',
//         'MMRMMRMRRM',
//     ]
//
//     const expected = ['5 1 E'];
//
//     expect(main(input)).toEqual(expected);
// })
//
// test("Example - Two Rovers", () => {
//     const input = [
//         '5 5',
//         '1 2 N',
//         'LMLMLMLMM',
//         '3 3 E',
//         'MMRMMRMRRM',
//     ]
//
//     const expected = [
//         '1 3 N',
//         '5 1 E',
//     ];
//
//     expect(main(input)).toEqual(expected);
// })
