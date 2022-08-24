import { BaseType } from './base-type.js';

export interface DateType extends BaseType<'date'> {
    /**
     * If this value is `true`, the `Auditor` instance will try to parse strings
     * with a valid JSON Date format (like `'2022-12-31T03:00:00.000Z'`). If the
     * convertion is sucessfull, the returned value will be a `Date` type,
     * otherwise, the `Auditor` instance will throws an `InvalidJSONDateError`
     * instance.
     */
    fromJSON?: boolean;
}