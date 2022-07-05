import { BaseType } from './base-type.js';
import { ArrayType } from './array-type.js';

import { DateType } from './date-type.js';
import { NumberType } from './number-type.js';
import { StringType } from './string-type.js';
import { BooleanType } from './boolean-type.js';

export interface ObjectType extends BaseType<'object'> {
    keys: Record<
        string,
        ArrayType   |
        ObjectType  |

        DateType    |
        NumberType  |
        StringType  |
        BooleanType
    >;
}