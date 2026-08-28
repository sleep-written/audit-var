import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        [1, 2, 3],
        ['a', 'b', 'c'],
        [true, false, true]
    ] as const
});

describe('enum.case-04', () => {
    it('target = [1, 2, 3], target matches one of the enum arrays', () => {
        const target = [1, 2, 3];
        const result = auditor.audit(target);
        deepStrictEqual(result, [1, 2, 3]);
    });

    it('target = ["a", "b", "c"], target matches one of the enum arrays', () => {
        const target = ['a', 'b', 'c'];
        const result = auditor.audit(target);
        deepStrictEqual(result, ['a', 'b', 'c']);
    });

    it('target = [true, false, true], target matches one of the enum arrays', () => {
        const target = [true, false, true];
        const result = auditor.audit(target);
        deepStrictEqual(result, [true, false, true]);
    });

    it('target = [1, 2], target does not match any of the enum arrays', () => {
        throws(
            () => {
                const target = [1, 2];
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });

    it('target = ["a", "b"], target does not match any of the enum arrays', () => {
        throws(
            () => {
                const target = ['a', 'b'];
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
