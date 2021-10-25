import { CommonOptions } from '../interfaces';

export interface StringOptions extends CommonOptions<string> {
    /**
     * If this option is `true`, trims the input value before
     * evaluates the length of the incoming value.
     */
    trim: boolean;

    /**
     * The minimum string length accepted by the audit process.
     */
    min?: number;

    /**
     * The maximum string length accepted by the audit process.
     */
    max?: number;
}
