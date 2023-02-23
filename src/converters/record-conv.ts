import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { converterFunct, RecordType } from '../interfaces/index.js';
import { recursiveConv } from './recursive-conv.js';

export const recordConv: converterFunct<RecordType> = (d, t, p) => {
    if (t == null) {
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }
    } else if (typeof t !== 'object') {
        throw new InvalidTypeError(d.type, p);
    } else {
        const resp: any = {};
        for (const key of Object.keys(t)) {
            const path = [...p, key];
            const item = recursiveConv(d.items, t[key], path);
            resp[key] = item;
        }

        return resp;
    }
};