import { BaseType } from './base-type';

export interface NumberType extends BaseType<'number'> {
    min?: number;
    max?: number;
}
