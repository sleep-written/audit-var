import { CommonOptions } from '../interfaces';

export interface NumberOptions extends CommonOptions<number> {
    /**
     * If this option is `true` and the incoming value it's out of
     * range (established with the properties `min` and `max`), the
     * incoming number will be adjusted to this limits.
     */
    limiter: boolean;

    /**
     * The minimum valid value.
     */
    min?: number;
    
    /**
     * The maximum valid value.
     */
    max?: number;
}
