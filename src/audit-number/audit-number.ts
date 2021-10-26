import { typeOf } from '../tool/type-of';
import { Auditable } from '../interfaces';
import { EmptyValueError, InvalidTypeError } from '../errors';

import { NumberOptions } from './number-options';
import { MaximumValueError, MinimumValueError } from './errors';

export class AuditNumber implements Auditable<number, NumberOptions> {
    private _options: NumberOptions;
    get options(): NumberOptions {
        return this._options;
    }
    set options(v: NumberOptions) {
        this._options = v;
    }

    constructor(options?: Partial<NumberOptions>) {
        this._options = {
            default: options?.default,
            limiter: options?.limiter ?? false,
            min: options?.min,
            max: options?.max,
        };
    }

    audit(input: any): number {
        // Check for null input
        if (input == null) {
            if (typeof this._options.default === 'number') {
                return this._options.default;
            } else {
                throw new EmptyValueError('number');
            }
        }
        
        // Check for invalid input
        const inputType = typeOf(input);
        if (inputType !== 'number') {
            throw new InvalidTypeError('number', inputType);
        }

        // Minimum limit
        let output = input as number;
        const min = this._options.min;
        if (typeof min === 'number' && output < min) {
            if (this._options.limiter) {
                output = min;
            } else {
                throw new MinimumValueError(min, output);
            }
        }

        // Maximum limit
        const max = this._options.max;
        if (typeof max === 'number' && output > max) {
            if (this._options.limiter) {
                output = max;
            } else {
                throw new MaximumValueError(max, output);
            }
        }

        // Return value
        return output;
    }
}
