import { main, Position, Plateau, Direction, Rover } from './index';

test("Rover returns its position ", () => {
    const position: Position = { x: 1, y: 2 };
    const direction: Direction = 'N';
    const plateau = { maxX: 5, maxY: 5 };

    const rover = new Rover(position, direction, plateau);
    expect(rover.position).toEqual(position);
});

test("Rover returns its direction ", () => {
    const position: Position = { x: 1, y: 2 };
    const direction: Direction = 'N';
    const plateau = { maxX: 5, maxY: 5 };

    const rover = new Rover(position, direction, plateau);
    expect(rover.direction).toEqual(direction);
});

test.todo("Rover turns as directed")

test.todo("Rover moves as directed")

test.todo("Rover does not move off the plateau")

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
