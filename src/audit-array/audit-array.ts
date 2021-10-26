import { typeOf } from '../tool/type-of';
import { Auditable } from '../interfaces';
import { EmptyValueError, InvalidTypeError } from '../errors';

import { ArrayOptions } from './array-options';
import { MaximumArrayLengthError, MinimumArrayLengthError } from './errors';

export class AuditArray<T> implements Auditable<T[], ArrayOptions<T>> {
    private _options: ArrayOptions<T>;
    get options(): ArrayOptions<T> {
        return this._options;
    }
    set options(v: ArrayOptions<T>) {
        this._options = v;
    }

    constructor(options: ArrayOptions<T>) {
        this._options = options;
    }

    audit(input: any): T[] {
        // Check null object
        if (input == null) {
            throw new EmptyValueError('array');
        }

        // Check typeof
        const inputType = typeOf(input);
        if (inputType !== 'array') {
            throw new InvalidTypeError('array', inputType);
        }

        const min = this._options.min;
        const max = this._options.max;
        const copy = [ ...(input as T[]) ];
        const length = copy.length;

        // Check the length
        if (typeof min === 'number' && length < min) {
            throw new MinimumArrayLengthError(min, length);
        } else if (typeof max === 'number' && length > max) {
            if (this._options.cut) {
                copy.splice(max, length - max);
            } else {
                throw new MaximumArrayLengthError(max, length);
            }
        }
        
        // Build a copy of the array
        const output: T[] = [];
        for (const item of copy) {
            const obj = this._options.items.audit(item);
            output.push(obj);
        }

        // Return data
        return output;
    }

}