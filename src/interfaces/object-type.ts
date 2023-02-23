import { BaseType } from './base-type.js';
import { ArrayType } from './array-type.js';

import { DateType } from './date-type.js';
import { NumberType } from './number-type.js';
import { StringType } from './string-type.js';
import { RecordType } from './record-type.js';
import { BooleanType } from './boolean-type.js';

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