import { BaseType } from './base-type.js';

export interface DateType extends BaseType<'date'> {
    fromJSON?: boolean;
}