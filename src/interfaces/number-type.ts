import { BaseType } from './base-type.js';

export interface NumberType extends BaseType<'number'> {
    /**
     * If the incoming value has __lower__ than the value setted,
     * the `Auditor` instance will throws an `WrongLengthError`
     * instance.
     */
    min?: number;

    /**
     * If the incoming value has __higher__ than the value setted,
     * the `Auditor` instance will throws an `WrongLengthError`
     * instance.
     */
    max?: number;
}
