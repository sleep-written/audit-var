import { Auditable, AuditableType } from '../interfaces';
import { VoidOptions } from './null-options';

export class AuditNull<A extends Auditable<any, any>, T extends AuditableType<A>>
implements Auditable<T | null, VoidOptions<T, any>> {
    private _options: VoidOptions<T, any>;
    get options(): VoidOptions<T, any> {
        return this._options;
    }
    set options(v: VoidOptions<T, any>) {
        this._options = v;
    }
    constructor(auditor: A, strict?: boolean) {
        this._options = {
            auditor,
            strict: strict ?? false
        };
    }

    audit(input: any): T | null {
        if (input != null) {
            return this._options.auditor.audit(input);
        } else {
            return null;
        }
    }
}