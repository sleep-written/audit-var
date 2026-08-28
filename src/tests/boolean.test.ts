import { strictEqual, throws, ok } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('boolean', () => {
    it('optional = false; value = true', () => {
        const aud = new Auditor({ type: 'boolean' });
        const val = aud.audit(true);
        strictEqual(val, true);
    });

    it('optional = false; value = undefined', () => {
        const aud = new Auditor({ type: 'boolean' });
        throws(
            () => { aud.audit(undefined); },
            NotOptionalError
        );
    });

    it('optional = false; value = 666', () => {
        const aud = new Auditor({ type: 'boolean' });
        throws(
            () => { aud.audit(666); },
            InvalidTypeError
        );
    });

    it('optional = true; value = true', () => {
        const aud = new Auditor({ type: 'boolean', optional: true });
        const val = aud.audit(true);
        strictEqual(val, true);
    });

    it('optional = true; value = undefined', () => {
        const aud = new Auditor({ type: 'boolean', optional: true });
        const val = aud.audit(undefined);
        ok(val == null);
    });

    it('optional = true; value = 666', () => {
        const aud = new Auditor({ type: 'boolean', optional: true });
        throws(
            () => { aud.audit(666); },
            InvalidTypeError
        );
    });
});
