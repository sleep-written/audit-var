/**
 * Describes an audit option that allows to set a default value
 * in cases wichs the incoming value are null or undefined.
 * @template T The type of the default value.
 */
export interface DefaultOption<T> {
    /**
     * If this option is setted, when the incoming value should
     * `null` or `undefined`, this will be replaced by this
     * default value. Otherwise the audit function will launches
     * an error.
     */
    default?: T;
}
