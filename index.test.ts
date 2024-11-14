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

    describe('#move', () => {
        describe('When Rover faces to the north', () => {
            beforeEach(() => {
                rover.direction = 'N';
            });

            test("Rover faces to the west after it turns left", () => {
                const command: Command = 'L';
                rover.move(command);
                expect(rover.direction).toEqual('W');
            })

            test("Rover faces to the east after it turns right", () => {
                const command: Command = 'R';
                rover.move(command);
                expect(rover.direction).toEqual('E');
            })

            test("Rover moves up when it moves forward", () => {
                const command: Command = 'M';
                rover.move(command);
                expect(rover.position).toEqual({ x: 1, y: 3 });
            })
        });

        describe('When Rover faces to the west', () => {
            beforeEach(() => {
                rover.direction = 'W';
            });

            test("Rover faces to the south after it turns left", () => {
                const command: Command = 'L';
                rover.move(command);
                expect(rover.direction).toEqual('S');
            })

            test("Rover faces to the north after it turns right", () => {
                const command: Command = 'R';
                rover.move(command);
                expect(rover.direction).toEqual('N');
            })

            test("Rover moves left when it moves forward", () => {
                const command: Command = 'M';
                rover.move(command);
                expect(rover.position).toEqual({ x: 0, y: 2 });
            })
        });

        describe('When Rover faces to the south', () => {
            beforeEach(() => {
                rover.direction = 'S';
            });

            test("Rover faces to the east after it turns left", () => {
                const command: Command = 'L';
                rover.move(command);
                expect(rover.direction).toEqual('E');
            })

            test("Rover faces to the west after it turns right", () => {
                const command: Command = 'R';
                rover.move(command);
                expect(rover.direction).toEqual('W');
            })

            test("Rover moves down when it moves forwards", () => {
                const command: Command = 'M';
                rover.move(command);
                expect(rover.position).toEqual({ x: 1, y: 1 });
            })
        });

        describe('When Rover faces to the east', () => {
            beforeEach(() => {
                rover.direction = 'E';
            });

            test("Rover faces to the north after it turns left", () => {
                const command: Command = 'L';
                rover.move(command);
                expect(rover.direction).toEqual('N');
            })

            test("Rover faces to the south after it turns right", () => {
                const command: Command = 'R';
                rover.move(command);
                expect(rover.direction).toEqual('S');
            })

            test("Rover moves right when it moves forward", () => {
                const command: Command = 'M';
                rover.move(command);
                expect(rover.position).toEqual({ x: 2, y: 2 });
            })
        });

        describe("When Rover tries to move beyond the upper edge of the plateau", () => {
            const direction = 'N';
            const position = { x: 2, y: 5 };

            beforeEach(() => {
                rover.direction = direction;
                rover.position = position;
            });

            test("Rover stays at the last valid position", () => {
                rover.move('M');
                expect(rover.position).toEqual({ x: 2, y: 5 });
            });

            test("Rover does not change its direction", () => {
                rover.move('M');
                expect(rover.direction).toEqual('N');
            });
        });

        describe("When Rover tries to move beyond the bottom edge of the plateau", () => {
            const direction = 'S';
            const position = { x: 2, y: 0 };

            beforeEach(() => {
                rover.direction = direction;
                rover.position = position;
            });

            test("Rover stays at the last valid position", () => {
                rover.move('M');
                expect(rover.position).toEqual({ x: 2, y: 0 });
            });

            test("Rover does not change its direction", () => {
                rover.move('M');
                expect(rover.direction).toEqual('S');
            });
        });

        describe("When Rover tries to move beyond the left edge of the plateau", () => {
            const direction = 'W';
            const position = { x: 0, y: 3 };

            beforeEach(() => {
                rover.direction = direction;
                rover.position = position;
            });

            test("Rover stays at the last valid position", () => {
                rover.move('M');
                expect(rover.position).toEqual({ x: 0, y: 3 });
            });

            test("Rover does not change its direction", () => {
                rover.move('M');
                expect(rover.direction).toEqual('W');
            });
        });

        describe("When Rover tries to move beyond the right edge of the plateau", () => {
            const direction = 'E';
            const position = { x: 5, y: 3 };

            beforeEach(() => {
                rover.direction = direction;
                rover.position = position;
            });

            test("Rover stays at the last valid position", () => {
                rover.move('M');
                expect(rover.position).toEqual({ x: 5, y: 3 });
            });

            test("Rover does not change its direction", () => {
                rover.move('M');
                expect(rover.direction).toEqual('E');
            });
        });
    });
});

test("Example - Single Rover Pattern 1", () => {
    const input = [
        '5 5',
        '1 2 N',
        'LMLMLMLMM',
    ]

    const expected = ['1 3 N'];

    expect(main(input)).toEqual(expected);
})

test("Example - Single Rover Pattern 2", () => {
    const input = [
        '5 5',
        '3 3 E',
        'MMRMMRMRRM',
    ]

    const expected = ['5 1 E'];

    expect(main(input)).toEqual(expected);
})

test("Example - Two Rovers", () => {
    const input = [
        '5 5',
        '1 2 N',
        'LMLMLMLMM',
        '3 3 E',
        'MMRMMRMRRM',
    ]

    const expected = [
        '1 3 N',
        '5 1 E',
    ];

    expect(main(input)).toEqual(expected);
})
