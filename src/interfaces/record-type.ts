import type { BaseType } from './base-type.js';
import type { Types } from './types.js';

export interface RecordType extends BaseType<'record'> {
    /**
     * With this option you can specify the structure of every
     * item stored in the record, using the same options described
     * in the past types described. __You can declare nested arrays,
     * or object arrays too.__
     */
    items: Types;
}
