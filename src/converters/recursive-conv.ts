import { converterFunct, Types } from '../interfaces';
import { arrayConv } from './array-conv';
import { booleanConv } from './boolean-conv';
import { numberConv } from './number-conv';
import { stringConv } from './string-conv';

export const recursiveConv: converterFunct<Types> = (d, t, p) => {
    switch (d.type) {
        case 'string':
            return stringConv(d, t, p);

        case 'number':
            return numberConv(d, t, p);

        case 'boolean':
            return booleanConv(d, t, p);

        case 'array':
            return arrayConv(d, t, p);

        default:
            throw new Error('Unsupported type');
    }
};