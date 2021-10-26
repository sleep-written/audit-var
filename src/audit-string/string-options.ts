import { DefaultOption } from '../interfaces';

export interface StringOptions extends DefaultOption<string> {
    /**
     * If this option is `true`, trims the input value before
     * evaluates the length of the incoming value.
     */
    trim: boolean;

    /**
     * If this option is `true` and the incoming string are more
     * long than the option `max`, the output string will be cutted
     * to obtain the same length that the `max` length indicated.
     */
    cut: boolean;

    /**
     * The minimum string length accepted by the audit process.
     */
    min?: number;

    /**
     * The maximum string length accepted by the audit process.
     */
    max?: number;
}
