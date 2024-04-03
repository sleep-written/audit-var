import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        [1, 2, 3],
        ['a', 'b', 'c'],
        [true, false, true]
    ] as const
});

test('target = [1, 2, 3], target matches one of the enum arrays', t => {
    const target = [1, 2, 3];
    const result = auditor.audit(target);
    t.deepEqual(result, [1, 2, 3]);
});

test('target = ["a", "b", "c"], target matches one of the enum arrays', t => {
    const target = ['a', 'b', 'c'];
    const result = auditor.audit(target);
    t.deepEqual(result, ['a', 'b', 'c']);
});

test('target = [true, false, true], target matches one of the enum arrays', t => {
    const target = [true, false, true];
    const result = auditor.audit(target);
    t.deepEqual(result, [true, false, true]);
});

test('target = [1, 2], target does not match any of the enum arrays', t => {
    t.throws(
        () => {
            const target = [1, 2];
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});

test('target = ["a", "b"], target does not match any of the enum arrays', t => {
    t.throws(
        () => {
            const target = ['a', 'b'];
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});
