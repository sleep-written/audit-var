import type { Path } from '../interfaces/index.js';
import { AuditorError } from './auditor-error.js';

export class NotOptionalError extends AuditorError {
    constructor(path: Path) {
        super(path,
                `The value entered to this audit, isn't `
            +   'configured to accepts null or undefined values.'
        );
        this.name = 'NOT_OPTIONAL_ERROR';
    }
}
