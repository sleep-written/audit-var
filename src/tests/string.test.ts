import { strictEqual, throws, ok } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('string', () => {
    it('optional = false; value = "jajaja"', () => {
        const aud = new Auditor({ type: 'string' });
        const val = aud.audit('jajaja');
        strictEqual(val, 'jajaja');
    });

    it('optional = false; value = "jajajajajajaj" (max: 3)', () => {
        const aud = new Auditor({ type: 'string', max: 3 });
        throws(
            () => { aud.audit('jajajajajajaj'); },
            { message: 'The length of the string is higher than 3.' }
        );
    });

    it('optional = false; value = "jajajajajajaj" (max: 3, cut: true)', () => {
        const aud = new Auditor({ type: 'string', max: 3, cut: true });
        const val = aud.audit('jajajajajajaj');
        strictEqual(val, 'jaj');
    });

    it('optional = false; value = undefined', () => {
        const aud = new Auditor({ type: 'string' });
        throws(
            () => { aud.audit(undefined); },
            NotOptionalError
        );
    });

    it('optional = false; value = 555', () => {
        const aud = new Auditor({ type: 'string' });
        throws(
            () => { aud.audit(555); },
            InvalidTypeError
        );
    });

    it('optional = true; value = "jajaja"', () => {
        const aud = new Auditor({ type: 'string', optional: true });
        const val = aud.audit('jajaja');
        strictEqual(val, 'jajaja');
    });

    it('optional = true; value = undefined', () => {
        const aud = new Auditor({ type: 'string', optional: true });
        const val = aud.audit(undefined);
        ok(val == null);
    });

    it('optional = true; value = 555', () => {
        const aud = new Auditor({ type: 'string', optional: true });
        throws(
            () => { aud.audit(555); },
            InvalidTypeError
        );
    });
});
