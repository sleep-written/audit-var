import { typeOf } from '../tool/type-of';
import { Auditable } from '../interfaces';
import { EmptyValueError, InvalidTypeError } from '../errors';

import { StringOptions } from './string-options';
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
            trim: options?.trim ?? false,
            cut: options?.cut ?? false,
            min: options?.min,
            max: options?.max,
        }
    }

    audit(input: any): string {
        // When the input is null/undefined
        if (input == null) {
            if (typeof this._options.default === 'string') {
                return this._options.default;
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
        let output = input as string;
        if (this._options.trim) {
            output = output.trim();
        }

        // Check min length
        const min = this._options.min;
        if (typeof min === 'number' && output.length < min) {
            throw new MinimumLengthError(min, output.length);
        }

        // Check max length
        const max = this._options.max;
        if (typeof max === 'number' && output.length > max) {
            if (this._options.cut) {
                output = output.substr(0, max);
            } else {
                throw new MaximumLengthError(max, output.length);
            }
        }

        // Return the value
        return output;
    }
}