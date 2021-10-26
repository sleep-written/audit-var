export class MinimumStringLengthError extends Error {
    constructor(expected: number, actual: number) {
        super(
                `The minimum string length expected is ${expected} characters, `
            +   `but the actual string length is ${actual} characters.`
        );
    }
}