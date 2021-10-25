export interface CommonOptions<T> {
    /**
     * Replaces the input value with an other custom value when
     * the incoming value is `null` or `undefined`.
     */
    default?: T;

    /**
     * If this option is `true`, the `audit` function will return
     * the input value modified by the other options setted here.
     * Otherwise, the `audit` function will return the original
     * input value without changes.
     */
    mutable: boolean;
}