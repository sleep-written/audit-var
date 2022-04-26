import { BaseType } from './base-type';

export interface StringType extends BaseType<'string'> {
    trim?: boolean;
    min?: number;
    max?: number;
}
