import { InvalidTypeError } from '..';
import { Auditable } from '../interfaces';
import { DateOptions } from './date-options';
import { InvalidDateTypeError, InvalidStringDateError } from './errors';

export class AuditDate implements Auditable<Date, DateOptions> {
    private _options: DateOptions;
    get options(): DateOptions {
        return this._options;
    }
    set options(v: DateOptions) {
        this._options = v;
    }

    constructor(options?: Partial<DateOptions>) {
        this._options = {
            fromJSON: options?.fromJSON ?? false
        };
    }

    audit(input: any): Date {
        const typeOf = typeof input;
        if (this._options.fromJSON) {
            if (typeOf === 'string') {
                // Parse the string
                const out = new Date(input);
                if (isNaN(out as any)) {
                    throw new InvalidStringDateError(input);
                } else {
                    return out;
                }
            } else {
                throw new InvalidTypeError('string', typeOf);
            }
        } else if (!(input instanceof Date)) {
            throw new InvalidDateTypeError();
        } else {
            return input;
        }
    }

}
