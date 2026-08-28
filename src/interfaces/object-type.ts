import type { BaseType } from './base-type.js';
import type { Types } from './types.js';

export interface ObjectType extends BaseType<'object'> {
    /**
     * Defines the type of data expected for every key of the incoming object.
     */
    keys: Record<string, Types>;
}
