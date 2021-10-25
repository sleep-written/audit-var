import { typeOf } from '../tool/type-of';

import { Auditable } from '../interfaces';
import { BooleanOptions } from './boolean-options';
import { EmptyValueError, InvalidTypeError } from '../errors';

export class AuditBoolean implements Auditable<boolean, BooleanOptions> {
    private _options: BooleanOptions;
    get options(): BooleanOptions {
        return { ...this._options };
    }
    set options(v: BooleanOptions) {
        this._options = v;
    }

    constructor(options?: Partial<BooleanOptions>) {
        this._options = {
            default: options?.default,
            mutable: options?.mutable ?? false
        };
    }

    audit(input: any): boolean {
        const type = typeOf(input);
        if (type !== 'boolean') {
            const defaultType = typeOf(this._options.default);
            if (defaultType === 'boolean' && input == null) {
                if (this._options.mutable) {
                    return this._options.default as boolean;
                } else {
                    return input;
                }
            } else if (input == null) {
                // Return an empty error
                throw new EmptyValueError('boolean');
            } else {
                // Return an invalid error
                throw new InvalidTypeError('boolean', type);
            }
        } else {
            return input;
        }
    }
}
