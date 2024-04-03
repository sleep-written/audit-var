import type { Path } from '../interfaces/path.js';
import { AuditorError } from './auditor-error.js';

export class InvalidJSONDateError extends AuditorError {
    constructor(path: Path) {
        super(path, `The string provided as a JSON date string is invalid.`);
    }
}