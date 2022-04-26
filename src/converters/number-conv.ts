import { InvalidTypeError, NotOptionalError } from '../errors';
import { converterFunct, NumberType } from '../interfaces';

export const numberConv: converterFunct<NumberType> = (d, t, p) => {
    if (t == null) {
        // Null value
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }

    } else if (typeof t !== 'number') {
        // Invalid value
        throw new InvalidTypeError(d.type, p);

    } else {
        // Check size
        if (
            (typeof d.min === 'number') &&
            (t < d.min)
        ) {
            throw new Error(`The target value is less than ${d.min}.`);
        } else if (
            (typeof d.max === 'number') &&
            (t > d.max)
        ) {
            throw new Error(`The target value is more than ${d.max}.`);
        }

        // Valid number
        return t;
    }
};