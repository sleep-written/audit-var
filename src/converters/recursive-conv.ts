import { converterFunct, Types } from '../interfaces/index.js';
import { booleanConv } from './boolean-conv.js';
import { numberConv } from './number-conv.js';
import { objectConv } from './object-conv.js';
import { stringConv } from './string-conv.js';
import { arrayConv } from './array-conv.js';

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

        case 'object':
            return objectConv(d, t, p);

        default:
            throw new Error('Unsupported type');
    }
};