export class MaximumValueError extends Error {
    constructor(expected: number, actual: number) {
        super(
                `The maximum value expected is ${expected}, `
            +   `but the actual value given is ${actual}.`
        );
    }
}
