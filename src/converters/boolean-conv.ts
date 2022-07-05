import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { converterFunct, BooleanType } from '../interfaces/index.js';

export const booleanConv: converterFunct<BooleanType> = (d, t, p) => {
    if (t == null) {
        // Null value
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }

    } else if (typeof t !== 'boolean') {
        // Invalid value
        throw new InvalidTypeError(d.type, p);

    } else {
        // Valid boolean
        return t;
    }
};