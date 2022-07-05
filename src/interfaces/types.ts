import { DateType } from './date-type.js';
import { ArrayType } from './array-type.js';
import { ObjectType } from './object-type.js';
import { NumberType } from './number-type.js';
import { StringType } from './string-type.js';
import { BooleanType } from './boolean-type.js';

export type Types = 
    DateType |
    ArrayType |
    ObjectType |
    NumberType |
    StringType |
    BooleanType;