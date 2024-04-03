import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        { id: 55, text: 'lel' },
        { id: 66, text: 'lol' },
        { id: 99, text: 'kek' }
    ] as const
});

test('target = { id: 55, text: "lel" }, target matches one of the enum objects', t => {
    const target = { id: 55, text: 'lel' };
    const result = auditor.audit(target);
    t.deepEqual(result, { id: 55, text: 'lel' });
});

test('target = { id: 66, text: "lol" }, target matches one of the enum objects', t => {
    const target = { id: 66, text: 'lol' };
    const result = auditor.audit(target);
    t.deepEqual(result, { id: 66, text: 'lol' });
});

test('target = { id: 99, text: "kek" }, target matches one of the enum objects', t => {
    const target = { id: 99, text: 'kek' };
    const result = auditor.audit(target);
    t.deepEqual(result, { id: 99, text: 'kek' });
});

test('target = { id: 77, text: "lul" }, target does not match any of the enum objects', t => {
    t.throws(
        () => {
            const target = { id: 77, text: 'lul' };
            auditor.audit(target);
        },
        { instanceOf: ValueNotInEnumError }
    );
});
