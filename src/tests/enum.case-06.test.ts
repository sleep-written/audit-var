import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
        [{ id: 3, name: 'C' }, { id: 4, name: 'D' }],
        [{ id: 5, name: 'E' }, { id: 6, name: 'F' }]
    ] as const
});

describe('enum.case-06', () => {
    it('target matches one of the enum arrays with nested objects', () => {
        const target = [{ id: 3, name: 'C' }, { id: 4, name: 'D' }];
        const result = auditor.audit(target);
        deepStrictEqual(result, [{ id: 3, name: 'C' }, { id: 4, name: 'D' }]);
    });

    it('target does not match any of the enum arrays due to different object property', () => {
        throws(
            () => {
                const target = [{ id: 3, name: 'C' }, { id: 7, name: 'G' }]; // The second object does not match any in the enum
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });

    it('target partially matches one of the enum arrays', () => {
        throws(
            () => {
                const target = [{ id: 5, name: 'E' }]; // Missing the second object to fully match the enum entry
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
