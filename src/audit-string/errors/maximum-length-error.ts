export class MaximumLengthError extends Error {
    constructor(expected: number, actual: number) {
        super(
                `The maximum string length expected is ${expected} characters, `
            +   `but the actual string length is ${actual} characters.`
        );
    }
}