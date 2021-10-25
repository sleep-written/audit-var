import { TypeOfValue } from '../tool/type-of';
import { BaseError } from './base-error';

export class InvalidTypeError extends BaseError {
    constructor(expected: TypeOfValue, actual: TypeOfValue) {
        super(`The audit was expects `);
        this.message += `${this._writeType(expected)} value type, `;
        this.message += `but the type received is `;
        this.message += `${this._writeType(actual)} type.`;
    }
}