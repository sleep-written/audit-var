import { Types } from './types';

import { NumberType } from './number-type';
import { BooleanType } from './boolean-type';

import { ArrayType } from './array-type';
import { StringType } from './string-type';
import { ObjectType } from './object-type';

export type ResponseType<T extends Types> =
        T extends StringType
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
