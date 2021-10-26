import { assert } from 'chai';

import { AuditString } from './audit-string';
import { EmptyValueError, InvalidTypeError } from '../errors';
import { MaximumLengthError, MinimumLengthError } from './errors';

describe('Testing "./audit-string"', () => {
    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - trim:    false\n'
        +   '    - cut:     false\n'
        +   '    - min:     null\n'
        +   '    - max:     null'
    , () => {
        it('value -> "hello world"', () => {
            const boss = new AuditString();
            const resp = boss.audit('hello world');
            assert.strictEqual(resp, 'hello world');
        });
        
        it('value -> null', () => {
            try {
                const boss = new AuditString();
                boss.audit(null);
            } catch (err) {
                assert.instanceOf(err, EmptyValueError);
            }
        });
        
        it('value -> undefined', () => {
            try {
                const boss = new AuditString();
                boss.audit(undefined);
            } catch (err) {
                assert.instanceOf(err, EmptyValueError);
            }
        });
        
        it('value -> true', () => {
            try {
                const boss = new AuditString();
                boss.audit(true);
            } catch (err) {
                assert.instanceOf(err, InvalidTypeError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: "-"\n'
        +   '    - trim:    false\n'
        +   '    - cut:     false\n'
        +   '    - min:     null\n'
        +   '    - max:     null'
    , () => {
        it('value -> null', () => {
            const boss = new AuditString({ default: '-' });
            const resp = boss.audit(null);
            assert.strictEqual(resp, '-');
        });

        it('value -> undefined', () => {
            const boss = new AuditString({ default: '-' });
            const resp = boss.audit(undefined);
            assert.strictEqual(resp, '-');
        });

        it('value -> 111', () => {
            try {
                const boss = new AuditString({ default: '-' });
                boss.audit(111);
            } catch (err) {
                assert.instanceOf(err, InvalidTypeError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - trim:    false\n'
        +   '    - cut:     false\n'
        +   '    - min:     3\n'
        +   '    - max:     8'
    , () => {
        it('value -> "h"', () => {
            try {
                const boss = new AuditString({ min: 3, max: 8 });
                boss.audit('h');
            } catch (err) {
                assert.instanceOf(err, MinimumLengthError);
            }
        });

        it('value -> "hello"', () => {
            const boss = new AuditString({ min: 3, max: 8 });
            const resp = boss.audit('hello');
            assert.strictEqual(resp, 'hello');
        });

        it('value -> "nooo4747 37827"', () => {
            try {
                const boss = new AuditString({ min: 3, max: 8 });
                boss.audit('nooo4747 37827');
            } catch (err) {
                assert.instanceOf(err, MaximumLengthError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - trim:    true\n'
        +   '    - cut:     false\n'
        +   '    - min:     3\n'
        +   '    - max:     8'
    , () => {
        it('value -> "        h          "', () => {
            try {
                const boss = new AuditString({ trim: true, min: 3, max: 8 });
                boss.audit('        h          ');
            } catch (err) {
                assert.instanceOf(err, MinimumLengthError);
            }
        });

        it('value -> "     hello  "', () => {
            const boss = new AuditString({ trim: true, min: 3, max: 8 });
            const resp = boss.audit('     hello  ');
            assert.strictEqual(resp, 'hello');
        });

        it('value -> "   nooo4747 37827            "', () => {
            try {
                const boss = new AuditString({ trim: true, min: 3, max: 8 });
                boss.audit('   nooo4747 37827            ');
            } catch (err) {
                assert.instanceOf(err, MaximumLengthError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - trim:    true\n'
        +   '    - cut:     true\n'
        +   '    - min:     3\n'
        +   '    - max:     8'
    , () => {
        it('value -> "     hello  "', () => {
            const boss = new AuditString({ trim: true, min: 3, max: 8, cut: true });
            const resp = boss.audit('     hello  ');
            assert.strictEqual(resp, 'hello');
        });

        it('value -> "     hello 2837648273 283728       "', () => {
            const boss = new AuditString({ trim: true, min: 3, max: 8, cut: true });
            const resp = boss.audit('     hello 2837648273 283728       ');
            assert.strictEqual(resp, 'hello 28');
        });
    });
});
