export class NotBooleanTypeError extends Error {
    constructor() {
        super('The value received isn\'t a "boolean" type.');
    }
}