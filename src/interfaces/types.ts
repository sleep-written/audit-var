import type { DateType } from './date-type.js';
import type { ArrayType } from './array-type.js';
import type { ObjectType } from './object-type.js';
import type { NumberType } from './number-type.js';
import type { StringType } from './string-type.js';
import type { RecordType } from './record-type.js';
import type { BooleanType } from './boolean-type.js';

export type Types = 
    DateType |
    ArrayType |
    RecordType |
    ObjectType |
    NumberType |
    StringType |
    BooleanType;