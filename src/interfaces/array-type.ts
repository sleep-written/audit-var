import { BaseType } from './base-type.js';
import { NumberType } from './number-type.js';
import { StringType } from './string-type.js';
import { BooleanType } from './boolean-type.js';
import { ObjectType } from './object-type.js';

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
        BooleanType;
}