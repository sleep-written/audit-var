import { typeOf } from '../tool/type-of';

import { Auditable } from '../interfaces';
import { StringOptions } from './string-options';
import { EmptyValueError, InvalidTypeError } from '../errors';
import { MaximumLengthError, MinimumLengthError } from './errors';

export class AuditString implements Auditable<string, StringOptions> {
    private _options: StringOptions;
    get options(): StringOptions {
        return this._options;
    }
    set options(v: StringOptions) {
        this._options = v;
    }

    constructor(options?: Partial<StringOptions>) {
        this._options = {
            default: options?.default,
            mutable: options?.mutable ?? false,
            trim: options?.trim ?? false,
            cut: options?.cut ?? false,
            min: options?.min,
            max: options?.max,
        }
    }

    audit(input: any): string {
        // When the input is null/undefined
        if (input == null) {
            if (this._options.default != null) {
                if (this._options.mutable) {
                    return this._options.default;
                } else {
                    return input;
                }
            } else {
                throw new EmptyValueError('string');
            }
        }
        
        // When the input isn't an string
        const inputType = typeOf(input);
        if (typeOf(input) !== 'string') {
            throw new InvalidTypeError('string', inputType);
        }

        // Trim a copy of the input
        let copy = input as string;
        if (this._options.trim) {
            copy = copy.trim();
        }

        // Check min length
        const min = this._options.min;
        if (typeof min === 'number' && copy.length < min) {
            throw new MinimumLengthError(min, copy.length);
        }

        // Check max length
        const max = this._options.max;
        if (typeof max === 'number' && copy.length > max) {
            if (this._options.cut) {
                copy = copy.substr(0, max);
            } else {
                throw new MaximumLengthError(max, copy.length);
            }
        }

        // Return the value
        if (this._options.mutable) {
            return copy;
        } else {
            return input;
        }
    }
}