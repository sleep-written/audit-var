import { Path } from '../interfaces/index.js';

export abstract class AuditorError extends Error {
    protected _path: Path;
    get path(): Path {
        return [...this._path];
    }

    constructor(path: Path, message: string) {
        const strPath = path
            .map(x => typeof x === 'string'
                ?   `["${x}"]`
                :   `[${x}]`
            )
            .reduce((prev, curr, i) => i > 0
                ?   `${prev}${curr}`
                :   curr
            );

        super(message + ` Path: ${strPath}`);
        this._path = path;
    }
}