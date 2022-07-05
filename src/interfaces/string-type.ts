import { BaseType } from './base-type.js';

export interface StringType extends BaseType<'string'> {
    trim?: boolean;
    min?: number;
    max?: number;
}
