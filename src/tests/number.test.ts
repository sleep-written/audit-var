import { strictEqual, throws, ok } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('number', () => {
    it('optional = false; value = 555', () => {
        const aud = new Auditor({ type: 'number' });
        const val = aud.audit(555);
        strictEqual(val, 555);
    });

    it('optional = false; value = undefined', () => {
        const aud = new Auditor({ type: 'number' });
        throws(
            () => { aud.audit(undefined); },
            NotOptionalError
        );
    });

    it('optional = false; value = false', () => {
        const aud = new Auditor({ type: 'number' });
        throws(
            () => { aud.audit(false); },
            InvalidTypeError
        );
    });

    it('optional = true; value = 555', () => {
        const aud = new Auditor({ type: 'number', optional: true });
        const val = aud.audit(555);
        strictEqual(val, 555);
    });

    it('optional = true; value = undefined', () => {
        const aud = new Auditor({ type: 'number', optional: true });
        const val = aud.audit(undefined);
        ok(val == null);
    });

    it('optional = true; value = false', () => {
        const aud = new Auditor({ type: 'number', optional: true });
        throws(
            () => { aud.audit(false); },
            InvalidTypeError
        );
    });
});
