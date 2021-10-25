import { typeOf } from '../tool/type-of';
import { Auditable } from '../interfaces';

import {
    EmptyBooleanValueError,
    NotBooleanTypeError
} from './errors';

export class AuditBoolean implements Auditable<boolean> {
    private _permissive: boolean;

    constructor(permissive?: boolean) {
        this._permissive = permissive ?? false;
    }

    audit(input: any): boolean {
        const type = typeOf(input);
        if (type !== 'boolean') {
            if (this._permissive && input == null) {
                return false;
            } else if (input == null) {
                throw new EmptyBooleanValueError();
            } else {
                throw new NotBooleanTypeError();
            }
        } else {
            return input;
        }
    }
}
