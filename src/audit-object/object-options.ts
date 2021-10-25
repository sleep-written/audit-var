import { Auditable, CommonOptions } from '../interfaces';

export interface ObjectOptions<T extends Record<string, any>>
extends CommonOptions<T> {
    /**
     * If this option is `true`, the `audit` function will return
     * the input value modified by the other options setted here.
     * Otherwise, the `audit` function will return the original
     * input value without changes.
     * 
     * ### Note:
     * Setting this property at the top of the ancestors
     * replaces all descendants `mutable` option.
     */
    mutable: boolean;

    /**
     * Properties to audit.
     */
    keys: Record<keyof T, Auditable<any, CommonOptions<any>>>;
}
