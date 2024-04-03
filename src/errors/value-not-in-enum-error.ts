import type { Path } from '../interfaces/path.js';
import { AuditorError } from './auditor-error.js';

export class ValueNotInEnumError extends AuditorError {
    static #stringify(input: any): string {
        switch (typeof input) {
            case 'number':
            case 'string':
            case 'symbol':
            case 'undefined':
                return JSON.stringify(input);

            default:
                if (input !== null) {
                    return `[${typeof input}]`;
                } else if (input instanceof Array) {
                    return 'Array<any>';
                } else if (input instanceof Date) {
                    return input.toJSON();
                } else {
                    return `null`;
                }
        }
    }

    constructor(path: Path, expected: any, values: any[]) {
        const strExpected = ValueNotInEnumError.#stringify(expected);
        const strValues = values
            .map(x => ValueNotInEnumError.#stringify(x))
            .join(', ');

        super(path,
                `The value ${strExpected} isn't a velue of `
            +   `the enum. Expected values: ${strValues}.`
        );
    }
}