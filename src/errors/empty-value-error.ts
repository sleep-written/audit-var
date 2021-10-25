import { TypeOfValue } from '../tool/type-of';
import { BaseError } from './base-error';

export class EmptyValueError extends BaseError {
    constructor(expected: TypeOfValue) {
        super(`The audit was expects `);
        this.message += `${this._writeType(expected)} value type, `;
        this.message += `but the type received is null or undefined.`;
    }
}
