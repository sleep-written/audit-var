import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
        [{ id: 3, name: 'C' }, { id: 4, name: 'D' }],
        [{ id: 5, name: 'E' }, { id: 6, name: 'F' }]
    ] as const
});

test('target matches one of the enum arrays with nested objects', t => {
    const target = [{ id: 3, name: 'C' }, { id: 4, name: 'D' }];
    const result = auditor.audit(target);
    t.deepEqual(result, [{ id: 3, name: 'C' }, { id: 4, name: 'D' }]);
});

test('target does not match any of the enum arrays due to different object property', t => {
    t.throws(
        () => {
            const target = [{ id: 3, name: 'C' }, { id: 7, name: 'G' }]; // The second object does not match any in the enum
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});

test('target partially matches one of the enum arrays', t => {
    t.throws(
        () => {
            const target = [{ id: 5, name: 'E' }]; // Missing the second object to fully match the enum entry
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});
