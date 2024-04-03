import type { BaseType } from './base-type.js';
import type { ArrayType } from './array-type.js';

import type { DateType } from './date-type.js';
import type { NumberType } from './number-type.js';
import type { StringType } from './string-type.js';
import type { RecordType } from './record-type.js';
import type { BooleanType } from './boolean-type.js';

export interface ObjectType extends BaseType<'object'> {
    /**
     * Defines the type of data expected for every key of the incoming object.
     */
    keys: Record<
        string,
        ArrayType   |
        ObjectType  |
        RecordType  |
        DateType    |
        NumberType  |
        StringType  |
        BooleanType
    >;
}