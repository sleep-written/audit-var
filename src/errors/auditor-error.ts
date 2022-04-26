import { Path } from '../interfaces';

export abstract class AuditorError extends Error {
    protected _path: Path;
    get path(): Path {
        return [...this._path];
    }

    constructor(path: Path, message: string) {
        super(message + `\npath: ${path}`);
        this._path = path;
    }
}