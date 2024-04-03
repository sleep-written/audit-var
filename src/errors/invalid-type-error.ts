import type { Path, Types } from '../interfaces/index.js';
import { AuditorError } from './auditor-error.js';

export class InvalidTypeError extends AuditorError {
    constructor(type: Types['type'], path: Path) {
        const aaa = type.match(/^[aeiou]/gi)
            ?   'an'
            :   'a';

        super(path,
                `The value entered to this audit, isn't ${aaa} `
            +   `"${type}" object.`
        );

        this.name = 'INVALID_TYPE_ERROR';
    }
}
