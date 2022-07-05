import test from 'ava';

import { Auditor } from '../auditor.js';
import { InvalidTypeError, NotOptionalError } from '../errors/index.js';

test('optional = false -> false; value = [55, 66, 77]', t => {
    const aud = new Auditor({
        type: 'array',
        items: { type: 'number' }
    });

    const arr = aud.audit([55, 66, 77]);
    t.deepEqual(arr, [55, 66, 77]);
});

test('optional = false -> false; value = [55, null, 77]', t => {
    const aud = new Auditor({
        type: 'array',
        items: { type: 'number' }
    });

    t.throws(
        () => { aud.audit([55, null, 77]); },
        { instanceOf: NotOptionalError }
    );
});

test('optional = false -> false; value = [55, "x", 77]', t => {
    const aud = new Auditor({
        type: 'array',
        items: { type: 'number' }
    });

    t.throws(
        () => { aud.audit([55, 'x', 77]); },
        { instanceOf: InvalidTypeError }
    );
});

test('optional = false -> true; value = [55, 66, 77]', t => {
    const aud = new Auditor({
        type: 'array',
        items: {
            type: 'number',
            optional: true,
        }
    });

    const arr = aud.audit([55, 66, 77]);
    t.deepEqual(arr, [55, 66, 77]);
});

test('optional = false -> true; value = [55, null, 77]', t => {
    const aud = new Auditor({
        type: 'array',
        items: {
            type: 'number',
            optional: true,
        }
    });

    const arr = aud.audit([55, null, 77]);
    t.deepEqual(arr, [55, undefined, 77]);
});

test('optional = false -> true; value = [55, null, "x"]', t => {
    const aud = new Auditor({
        type: 'array',
        items: {
            type: 'number',
            optional: true,
        }
    });

    t.throws(
        () => { aud.audit([55, null, 'x']); },
        { instanceOf: InvalidTypeError }
    );
});
