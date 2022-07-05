import { BaseType } from './base-type.js';

export interface NumberType extends BaseType<'number'> {
    min?: number;
    max?: number;
}
