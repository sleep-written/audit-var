export interface DateOptions {
    /**
     * If this option is `true` and the incoming value is an string,
     * that value will be parsed into a Date object. If the result of that
     * operation generates an invalid date, an `InvalidStringDateError` instance
     * will be thrown.
     */
    fromJSON: boolean;
}
