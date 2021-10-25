export class MinimumValueError extends Error {
    constructor(expected: number, actual: number) {
        super(
                `The minimum value expected is ${expected}, `
            +   `but the actual value given is ${actual}.`
        );
    }
}
