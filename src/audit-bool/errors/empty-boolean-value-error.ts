export class EmptyBooleanValueError extends Error {
    constructor() {
        super(
                'The value received is null or undefined, '
            +   'which is not allowed in strict mode (as default).'
        );
    }
}