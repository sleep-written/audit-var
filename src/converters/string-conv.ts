import { InvalidTypeError, NotOptionalError } from '../errors';
import { StringType, converterFunct } from '../interfaces';

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
            throw new Error(`The length the target is less than ${d.min}.`);
        } else if (
            (typeof d.max === 'number') &&
            (v.length > d.max)
        ) {
            throw new Error(`The length the target is more than ${d.max}.`);
        }

        // Valid string
        return v;
    }
};