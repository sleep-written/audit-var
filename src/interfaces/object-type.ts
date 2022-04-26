import { ArrayType } from './array-type';
import { BaseType } from './base-type';
import { BooleanType } from './boolean-type';
import { NumberType } from './number-type';
import { StringType } from './string-type';

export interface ObjectType extends BaseType<'object'> {
    keys: Record<
        string,
        ArrayType   |
        StringType  |
        NumberType  |
        ObjectType  |
        BooleanType
    >;
}