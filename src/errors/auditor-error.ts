import { Path } from '../interfaces/index.js';

export abstract class AuditorError extends Error {
    protected _path: Path;
    get path(): Path {
        return [...this._path];
    }

    constructor(path: Path, message: string) {
        const strPath = path.length > 0
            ?   path
                    .map(x => typeof x === 'string'
                        ?   `["${x}"]`
                        :   `[${x}]`
                    )
                    .reduce(
                        (prev, curr) => `${prev}${curr}`,
                        ' Path: '
                    )
            :   '';

        super(message + strPath);
        this._path = path;
    }
}