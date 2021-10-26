export interface DefaultValueOption<T> {
    /**
     * If this option is setted, when the incoming value should
     * `null` or `undefined`, this will be replaced by this
     * default value. Otherwise the audit function will launches
     * an error.
     */
    default?: T;
}
