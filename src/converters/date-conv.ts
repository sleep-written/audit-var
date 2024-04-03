import type { converterFunct, DateType } from '../interfaces/index.js';
import { InvalidJSONDateError, InvalidTypeError, NotOptionalError } from '../errors/index.js';

export const dateConv: converterFunct<DateType> = (d, t, p) => {
    if (t == null) {
        // Null value
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }

    } else if (!(t instanceof Date)) {
        if (d.fromJSON && typeof t === 'string') {
            const conv = new Date(t);
            if (isNaN(conv as any)) {
                throw new InvalidJSONDateError(p);
            } else {
                return conv;
            }
        } else {
            // Invalid value
            throw new InvalidTypeError(d.type, p);
        }

    } else {
        // Valid boolean
        return t;
    }
};