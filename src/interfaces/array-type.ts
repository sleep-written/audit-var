import { BaseType } from './base-type';
import { NumberType } from './number-type';
import { StringType } from './string-type';
import { BooleanType } from './boolean-type';
import { ObjectType } from './object-type';

export interface ArrayType extends BaseType<'array'> {
    items:
        ArrayType   |
        NumberType  |
        StringType  |
        ObjectType  |
        BooleanType;
}