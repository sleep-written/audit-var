import { InvalidTypeError, NotOptionalError, WrongLengthError } from '../errors/index.js';
import { ArrayType, converterFunct } from '../interfaces/index.js';
import { recursiveConv } from './recursive-conv.js';

export const arrayConv: converterFunct<ArrayType> = (d, t, p) => {
    if (t == null) {
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }
    } else if (!(t instanceof Array)) {
        throw new InvalidTypeError(d.type, p);
    } else {
        if (
            (typeof d.min === 'number') &&
            (t.length < d.min)
        ) {
            throw new WrongLengthError(p, `The array length is lower than ${d.min}.`);
        } else if (
            (typeof d.max === 'number') &&
            (t.length > d.max)
        ) {
            throw new WrongLengthError(p, `The array length is higher than ${d.max}.`);    
        }
        
        const resp: any[] = [];
        for (let i = 0; i < t.length; i++) {
            const path = [...p, i];
            const item = recursiveConv(d.items, t[i], path);
            resp.push(item);
        }

        return resp;
    }
};