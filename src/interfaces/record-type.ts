import type { BaseType } from './base-type.js';
import type { NumberType } from './number-type.js';
import type { StringType } from './string-type.js';
import type { BooleanType } from './boolean-type.js';
import type { ObjectType } from './object-type.js';
import type { ArrayType } from './array-type.js';

export interface RecordType extends BaseType<'record'> {
    /**
     * With this option you can specify the structure of every
     * item stored in the record, using the same options described
     * in the past types described. __You can declare nested arrays,
     * or object arrays too.__
     */
    items:
        ArrayType   |
        RecordType  |
        NumberType  |
        StringType  |
        ObjectType  |
        BooleanType;
}