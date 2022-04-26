import { Path, Types } from '../interfaces';
import { AuditorError } from './auditor-error';

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
