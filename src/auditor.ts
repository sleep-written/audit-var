import { Types, ResponseType } from './interfaces/index.js';
import { recursiveConv } from './converters/index.js';

export class Auditor<T extends Types> {
    private _def: T;

    constructor(definition: T) {
        this._def = definition;
    }

    audit(target: any): ResponseType<T> {
        return recursiveConv(this._def, target, []);
    }
}