import type { BaseType } from './base-type.js';
import type { NumberType } from './number-type.js';
import type { StringType } from './string-type.js';
import type { ObjectType } from './object-type.js';
import type { RecordType } from './record-type.js';
import type { BooleanType } from './boolean-type.js';
import type { EnumType } from './enum-type.js';

export interface ArrayType extends BaseType<'array'> {
    /**
     * If the incoming array has a length __lower__ than the value
     * setted, the `Auditor` instance will throws an `WrongLengthError`
     * instance.
     */
    min?: number;

    /**
     * If the incoming array has a length __higher__ than the value
     * setted, the `Auditor` instance will throws an `WrongLengthError`
     * instance.
     */
    max?: number;

    /**
     * With this option you can specify the structure of every
     * item stored in the array, using the same options described
     * in the past types described. __You can declare nested arrays,
     * or object arrays too.__
     */
    items:
        ArrayType   |
        NumberType  |
        StringType  |
        ObjectType  |
        RecordType  |
        BooleanType |
        EnumType;
}