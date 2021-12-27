import { DefaultOption } from '../interfaces';
import { ObjectOptionsKeys } from './object-options-keys';

export interface ObjectOptions<T extends Record<string, any>>
extends DefaultOption<T> {
    /**
     * If this option is `true`, the Audit function will checks
     * if the incoming object has exactly the same properties
     * declared. If the incoming object has at least one property
     * more than the expected properties, the audit function will
     * throws an error.
     */
    strict?: boolean;

    /**
     * Properties to audit.
     */
    keys: ObjectOptionsKeys<T>;
}
