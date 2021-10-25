import { TypeOfValue } from './type-of-value';

export function typeOf(input: any): TypeOfValue {
    if (input === null) {
        return 'null';
    } else if (input == null) {
        return 'undefined';
    } else if (input instanceof Array) {
        return 'array';
    } else {
        return typeof input;
    }
}