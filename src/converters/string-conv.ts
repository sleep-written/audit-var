import type { StringType, converterFunct } from '../interfaces/index.js';
import { InvalidTypeError, NotOptionalError, WrongLengthError } from '../errors/index.js';

export const stringConv: converterFunct<StringType> = (d, t, p) => {
    if (t == null) {
        // Null value
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }

    } else if (typeof t !== 'string') {
        // Invalid value
        throw new InvalidTypeError(d.type, p);

    } else {
        // Trim the value
        let v = d.trim ? t.trim() : t;

        // Check size
        if (
            (typeof d.min === 'number') &&
            (v.length < d.min)
        ) {
            throw new WrongLengthError(p, `The length of the string is lower than ${d.min}.`);
        } else if (
            (typeof d.max === 'number') &&
            (v.length > d.max)
        ) {
            if (!d.cut) {
                throw new WrongLengthError(p, `The length of the string is higher than ${d.max}.`);
            } else {
                return v.slice(0, d.max);
            }
        }

        // Valid string
        return v;
    }
};