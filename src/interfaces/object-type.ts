import { ArrayType } from './array-type.js';
import { BaseType } from './base-type.js';
import { BooleanType } from './boolean-type.js';
import { NumberType } from './number-type.js';
import { StringType } from './string-type.js';

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