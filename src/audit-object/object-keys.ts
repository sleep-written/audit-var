import { Auditable } from '../interfaces';

export type ObjectKeys<T extends Record<any, any>> = {
    [K in keyof T]: Auditable<T[K], any>;
}
