import type { Types } from './types.js';
import type { ItemOfArray } from './item-of-array.js';

import type { NumberType } from './number-type.js';
import type { BooleanType } from './boolean-type.js';

import type { DateType } from './date-type.js';
import type { ArrayType } from './array-type.js';
import type { StringType } from './string-type.js';
import type { ObjectType } from './object-type.js';
import type { RecordType } from './record-type.js';
import type { EnumType } from './enum-type.js';

export type ResponseType<T extends Types> =
        T extends DateType
    ?   T['optional'] extends true
    ?   Date | undefined
    :   Date

    :   T extends StringType
    ?   T['optional'] extends true
    ?   string | undefined
    :   string

    :   T extends NumberType
    ?   T['optional'] extends true
    ?   number | undefined
    :   number

    :   T extends BooleanType
    ?   T['optional'] extends true
    ?   boolean | undefined
    :   boolean

    :   T extends EnumType
    ?   T['optional'] extends true
    ?   ItemOfArray<T['values']> | undefined
    :   ItemOfArray<T['values']>

    :   T extends ArrayType
    ?   T['optional'] extends true
    ?   ResponseType<T['items']>[] | undefined
    :   ResponseType<T['items']>[]

    :   T extends RecordType
    ?   T['optional'] extends true
    ?   Record<string, ResponseType<T['items']>> | undefined
    :   Record<string, ResponseType<T['items']>>

    :   T extends ObjectType
    ?   T['optional'] extends true
    ?   { [K in keyof T['keys']]: ResponseType<T['keys'][K]> } | undefined
    :   { [K in keyof T['keys']]: ResponseType<T['keys'][K]> }

    : never;
