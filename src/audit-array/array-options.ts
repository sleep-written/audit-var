import { Auditable } from '../interfaces';

export interface ArrayOptions<T> {
    /**
     * An audit object instance to apply for all items in the array.
     */
    items: Auditable<T, any>;

    /**
     * If this option is `true` and the incoming string are more
     * long than the option `max`, the output string will be cutted
     * to obtain the same length that the `max` length indicated.
     */
    cut?: boolean;

    /**
     * The minimum length accepted by the audit object.
     */
    min?: number;

    /**
     * The maximum length accepted by the audit object.
     */
    max?: number;
}
