import type { BaseType } from './base-type.js';

export interface EnumType extends BaseType<'enum'> {
    /**
     * An array containing the valid values for the enum.
     */
    values: any[];
}