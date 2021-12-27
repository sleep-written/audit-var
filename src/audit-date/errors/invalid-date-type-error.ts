export class InvalidDateTypeError extends Error {
    constructor() {
        super(`The value given isn't an instance of Date.`);
    }
}
