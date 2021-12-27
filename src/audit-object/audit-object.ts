import { Auditable } from '../interfaces';
import { AuditNull } from '../audit-null';
import { ObjectOptions } from './object-options';
import { EmptyValueError } from '../errors';
import { KeyNotFoundError, NotSameKeysError } from './errors';

export class AuditObject<T extends Record<string, any>>
implements Auditable<T, ObjectOptions<T>> {
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
            strict: options.strict,
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
        if (
            (this._options.strict) &&
            (expKeys.length !== actKeys.length)
        ) {
            throw new NotSameKeysError(expKeys, actKeys);
        }

        // Prepare the new object
        const clone = { ...input };
        const output: any = {};

        for (const expKey of expKeys) {
            // Search the key
            const auditor = this._options.keys[expKey];
            const found = actKeys.some(x => x === expKey);
            if (!found) {
                if (!(auditor instanceof AuditNull)) {
                    throw new KeyNotFoundError(expKey);
                } else {
                    continue;
                }
            }

            const target = clone[expKey];
            output[expKey] = auditor.audit(target);
        }

        // Return the value
        return output;
    }
}