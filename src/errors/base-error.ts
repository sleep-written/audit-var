import { TypeOfValue } from '../tool/type-of';

export class BaseError extends Error {
    protected _writeType(type: TypeOfValue): string {
        if (type.match(/^[aeiou]/i)) {
            return `an "${type}"`;
        } else {
            return `a "${type}"`;
        }
    }
}