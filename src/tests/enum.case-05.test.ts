import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        { id: 1, details: { name: 'Item 1', tags: ['a', 'b'] } },
        { id: 2, details: { name: 'Item 2', tags: ['c', 'd'] } },
        { id: 3, details: { name: 'Item 3', tags: ['e', 'f'] } }
    ] as const
});

test('target matches one of the enum objects with nested properties', t => {
    const target = { id: 2, details: { name: 'Item 2', tags: ['c', 'd'] } };
    const result = auditor.audit(target);
    t.deepEqual(result, { id: 2, details: { name: 'Item 2', tags: ['c', 'd'] } });
});

test('target does not match any of the enum objects due to different root property', t => {
    t.throws(
        () => {
            const target = { id: 4, details: { name: 'Item 4', tags: ['g', 'h'] } };
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});

test('target does not match any of the enum objects due to different nested property', t => {
    t.throws(
        () => {
            const target = { id: 1, details: { name: 'Item 1', tags: ['a', 'c'] } }; // Note the 'c' instead of 'b'
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});
