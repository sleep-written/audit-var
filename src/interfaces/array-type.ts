import { BaseType } from './base-type.js';
import { NumberType } from './number-type.js';
import { StringType } from './string-type.js';
import { BooleanType } from './boolean-type.js';
import { ObjectType } from './object-type.js';

export interface ArrayType extends BaseType<'array'> {
    items:
        ArrayType   |
        NumberType  |
        StringType  |
        ObjectType  |
        BooleanType;
}