import { Auditable } from '../interfaces';
import { ObjectOptions } from './object-options';
import { EmptyValueError } from '../errors';

export class AuditObject<T extends Record<string, any>>
implements Auditable<Record<string, any>, ObjectOptions<T>> {
    private _options: ObjectOptions<T>;
    get options(): ObjectOptions<T> {
        return this._options;
    }
    set options(v: ObjectOptions<T>) {
        this._options = v;
    }

    constructor(options: ObjectOptions<T>) {
        this._options = {
            default: options.default,
            mutable: options.mutable ?? false,
            
            keys: { ...options.keys }
        };
    }

    audit(input: any): T {
        // Read the default value
        if (this._options.default && input == null) {
            return this._options.default;
        } else if (input == null) {
            throw new EmptyValueError('object');
        }

        // Get the keys
        const expKeys = Object.keys(this._options.keys);
        const actKeys = Object.keys(input);

        // Strict mode
        if (expKeys.length !== actKeys.length) {
            throw new Error();
        }

        // Prepare the new object
        const clone = { ...input };
        const copy: any = {};

        for (const expKey of expKeys) {
            // Search the key
            const found = actKeys.some(x => x === expKey);
            if (!found) {
                throw new Error();
            }

            const target = clone[expKey];
            const targetAudit = this._options.keys[expKey];

            // Emit mutable
            if (this._options.mutable) {
                targetAudit.options.mutable = true;
                this._options.mutable = true;
            }
            
            // Audit the key
            copy[expKey] = targetAudit.audit(target);
            if (targetAudit.options.mutable) {
                this._options.mutable = true;
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