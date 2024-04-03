import type { Types, ResponseType } from './interfaces/index.js';
import { recursiveConv } from './converters/index.js';

export class Auditor<T extends Types> {
    private _structure: T;

    /**
     * Gets the actual structure declared in the constructor.
     * Useful if you want to use this as a nested structure in
     * another `Auditor` instance for example.
     */
    get structure(): T {
        return this._structure;
    }

    /**
     * Creates an instance of `Auditor` class. With this instance you can validate
     * untyped objects with the structure defined in the constructor.
     * @param structure The structure do you want to use to validate objects.
     */
    constructor(structure: T) {
        this._structure = structure;
    }

    /**
     * Checks recursively (when is required) the structure of an object.
     * If the target doesn't meets the required structured (declared in the
     * constructor), this method will throws an error, otherwise will returns
     * a typed and normalized version of the incoming target.
     * @param target The object do you want to eval its structure.
     */
    audit(target: any): ResponseType<T> {
        return recursiveConv(this._structure, target, []);
    }
}
