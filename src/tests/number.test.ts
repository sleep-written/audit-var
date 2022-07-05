import test from 'ava';

import { Auditor } from '../auditor.js';
import { InvalidTypeError, NotOptionalError } from '../errors/index.js';

test('optional = false; value = 555', t => {
    const aud = new Auditor({ type: 'number' });
    const val = aud.audit(555);
    t.is(val, 555);
});

test('optional = false; value = undefined', t => {
    const aud = new Auditor({ type: 'number' });
    t.throws(
        () => { aud.audit(undefined); },
        { instanceOf: NotOptionalError }
    );
});

test('optional = false; value = false', t => {
    const aud = new Auditor({ type: 'number' });
    t.throws(
        () => { aud.audit(false); },
        { instanceOf: InvalidTypeError }
    );
});

test('optional = true; value = 555', t => {
    const aud = new Auditor({ type: 'number', optional: true });
    const val = aud.audit(555);
    t.is(val, 555);
});

test('optional = true; value = undefined', t => {
    const aud = new Auditor({ type: 'number', optional: true });
    const val = aud.audit(undefined);
    t.assert(val == null);
});

test('optional = true; value = false', t => {
    const aud = new Auditor({ type: 'number', optional: true });
    t.throws(
        () => { aud.audit(false); },
        { instanceOf: InvalidTypeError }
    );
});