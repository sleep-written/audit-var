import type { ObjectType, converterFunct } from '../interfaces/index.js';
import { NotOptionalError } from '../errors/index.js';
import { recursiveConv } from './recursive-conv.js';

export const objectConv: converterFunct<ObjectType> = (d, t, p) => {
    if (t == null) {
        if (!d.optional) {
            throw new NotOptionalError(p);
        } else {
            return undefined;
        }
    } else {
        const resp: any = {};

        for (const key of Object.keys(d.keys)) {
            const path = [...p, key];
            resp[key] = recursiveConv(d.keys[key], t[key], path);
        }

        return resp;
    }
};