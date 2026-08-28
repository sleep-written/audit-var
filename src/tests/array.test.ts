import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('array', () => {
    it('optional = false -> false; value = [55, 66, 77]', () => {
        const aud = new Auditor({
            type: 'array',
            items: { type: 'number' }
        });

        const arr = aud.audit([55, 66, 77]);
        deepStrictEqual(arr, [55, 66, 77]);
    });

    it('optional = false -> false; value = [55, null, 77]', () => {
        const aud = new Auditor({
            type: 'array',
            items: { type: 'number' }
        });

        throws(
            () => { aud.audit([55, null, 77]); },
            NotOptionalError
        );
    });

    it('optional = false -> false; value = [55, "x", 77]', () => {
        const aud = new Auditor({
            type: 'array',
            items: { type: 'number' }
        });

        throws(
            () => { aud.audit([55, 'x', 77]); },
            InvalidTypeError
        );
    });

    it('optional = false -> true; value = [55, 66, 77]', () => {
        const aud = new Auditor({
            type: 'array',
            items: {
                type: 'number',
                optional: true,
            }
        });

        const arr = aud.audit([55, 66, 77]);
        deepStrictEqual(arr, [55, 66, 77]);
    });

    it('optional = false -> true; value = [55, null, 77]', () => {
        const aud = new Auditor({
            type: 'array',
            items: {
                type: 'number',
                optional: true,
            }
        });

        const arr = aud.audit([55, null, 77]);
        deepStrictEqual(arr, [55, undefined, 77]);
    });

    it('optional = false -> true; value = [55, null, "x"]', () => {
        const aud = new Auditor({
            type: 'array',
            items: {
                type: 'number',
                optional: true,
            }
        });

        throws(
            () => { aud.audit([55, null, 'x']); },
            InvalidTypeError
        );
    });
});
