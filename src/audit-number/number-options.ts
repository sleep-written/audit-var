import { DefaultValueOption } from '../interfaces';

export interface NumberOptions extends DefaultValueOption<number> {
    /**
     * If this option is `true` and the incoming value it's out of
     * range (established with the properties `min` and `max`), the
     * incoming number will be adjusted inside to this limits.
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
