import { BaseType } from './base-type.js';

export interface StringType extends BaseType<'string'> {
    /**
     * Trims the incoming string __before to make any length validation.__
     */
    trim?: boolean;

    /**
     * If the incoming string has a length __lower__ than the value setted,
     * the `Auditor` instance will throws an `WrongLengthError` instance.
     */
    min?: number;

    /**
     * If the incoming string has a length __higher__ than the value setted,
     * the `Auditor` instance will throws an `WrongLengthError` instance.
     */
    max?: number;

    /**
     * If this option is enabled, when the length of the incoming string is
     * longer than the max value settled, the output value will be cutted
     * instead to throws an error.
     */
    cut?: boolean;
}
