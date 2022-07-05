import test from 'ava';

import { Auditor } from '../auditor.js';
import { InvalidTypeError, NotOptionalError } from '../errors/index.js';

test('optional = false; value = "jajaja"', t => {
    const aud = new Auditor({ type: 'string' });
    const val = aud.audit('jajaja');
    t.is(val, 'jajaja');
});

test('optional = false; value = undefined', t => {
    const aud = new Auditor({ type: 'string' });
    t.throws(
        () => { aud.audit(undefined); },
        { instanceOf: NotOptionalError }
    );
});

test('optional = false; value = 555', t => {
    const aud = new Auditor({ type: 'string' });
    t.throws(
        () => { aud.audit(555); },
        { instanceOf: InvalidTypeError }
    );
});

test('optional = true; value = "jajaja"', t => {
    const aud = new Auditor({ type: 'string', optional: true });
    const val = aud.audit('jajaja');
    t.is(val, 'jajaja');
});

test('optional = true; value = undefined"', t => {
    const aud = new Auditor({ type: 'string', optional: true });
    const val = aud.audit(undefined);
    t.assert(val == null);
});

test('optional = true; value = 555', t => {
    const aud = new Auditor({ type: 'string', optional: true });
    t.throws(
        () => { aud.audit(555); },
        { instanceOf: InvalidTypeError }
    );
});