import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        { id: 1, details: { name: 'Item 1', tags: ['a', 'b'] } },
        { id: 2, details: { name: 'Item 2', tags: ['c', 'd'] } },
        { id: 3, details: { name: 'Item 3', tags: ['e', 'f'] } }
    ] as const
});

describe('enum.case-05', () => {
    it('target matches one of the enum objects with nested properties', () => {
        const target = { id: 2, details: { name: 'Item 2', tags: ['c', 'd'] } };
        const result = auditor.audit(target);
        deepStrictEqual(result, { id: 2, details: { name: 'Item 2', tags: ['c', 'd'] } });
    });

    it('target does not match any of the enum objects due to different root property', () => {
        throws(
            () => {
                const target = { id: 4, details: { name: 'Item 4', tags: ['g', 'h'] } };
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });

    it('target does not match any of the enum objects due to different nested property', () => {
        throws(
            () => {
                const target = { id: 1, details: { name: 'Item 1', tags: ['a', 'c'] } }; // Note the 'c' instead of 'b'
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
