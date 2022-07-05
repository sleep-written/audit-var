import { Path } from '../interfaces/path.js';
import { AuditorError } from './auditor-error.js';

export class WrongLengthError extends AuditorError {
    constructor(
        path: Path,
        message: string
    ) {
        super(path, message);
    }
}