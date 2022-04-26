import test from 'ava';

import { Auditor } from '../auditor';
import { InvalidTypeError, NotOptionalError } from '../errors';

test('optional = false; value = true', t => {
    const aud = new Auditor({ type: 'boolean' });
    const val = aud.audit(true);
    t.true(val);
});

test('optional = false; value = undefined', t => {
    const aud = new Auditor({ type: 'boolean' });
    t.throws(
        () => { aud.audit(undefined); },
        { instanceOf: NotOptionalError }
    );
});

test('optional = false; value = 666', t => {
    const aud = new Auditor({ type: 'boolean' });
    t.throws(
        () => { aud.audit(666); },
        { instanceOf: InvalidTypeError }
    );
});

test('optional = true; value = true', t => {
    const aud = new Auditor({ type: 'boolean', optional: true });
    const val = aud.audit(true);
    t.true(val);
});

test('optional = true; value = undefined', t => {
    const aud = new Auditor({ type: 'boolean', optional: true });
    const val = aud.audit(undefined);
    t.assert(val == null);
});

test('optional = true; value = 666', t => {
    const aud = new Auditor({ type: 'boolean', optional: true });
    t.throws(
        () => { aud.audit(666); },
        { instanceOf: InvalidTypeError }
    );
});