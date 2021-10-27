import { Auditable } from '../interfaces';

export interface VoidOptions<Type, Options> {
    auditor: Auditable<Type, Options>;
    strict: boolean;
}
