import type { EnumType, converterFunct } from '../interfaces/index.js';
import { ValueNotInEnumError, NotOptionalError } from '../errors/index.js';

function isDeepEqual(a: any, b: any): boolean {
    // Comparison of primitive types (Numbers, Strings, Booleans, etc.)
    if (a === b) return true;

    // Functions (they are considered the same if they are the same reference)
    if (typeof a === 'function' && typeof b === 'function') return a === b;

    // Date comparison
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    // Array Comparison
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!isDeepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    // Comparison of objects (including Maps and Sets)
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;

        for (const key of aKeys) {
            if (!(key in b)) return false;
            if (!isDeepEqual(a[key], b[key])) return false;
        }

        return true;
    }

    // If none of the above cases match, the values are not equal.
    return false;
}

export const enumConv: converterFunct<EnumType> = (d, t, p) => {
    const found = d.values.some(x => isDeepEqual(t, x));
    if (!found) {
        if (t == null && !d.optional) {
            throw new NotOptionalError(p);
        } else if (t != null) {
            throw new ValueNotInEnumError(p, t, d.values);
        } else {
            return undefined;
        }
    } else {
        return t;
    }
};
