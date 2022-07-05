import { Types } from './types.js';

import { NumberType } from './number-type.js';
import { BooleanType } from './boolean-type.js';

import { DateType } from './date-type.js';
import { ArrayType } from './array-type.js';
import { StringType } from './string-type.js';
import { ObjectType } from './object-type.js';

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

    :   T extends ArrayType
    ?   T['optional'] extends true
    ?   ResponseType<T['items']>[] | undefined
    :   ResponseType<T['items']>[]

    :   T extends ObjectType
    ?   T['optional'] extends true
    ?   { [K in keyof T['keys']]: ResponseType<T['keys'][K]> } | undefined
    :   { [K in keyof T['keys']]: ResponseType<T['keys'][K]> }

    : never;
