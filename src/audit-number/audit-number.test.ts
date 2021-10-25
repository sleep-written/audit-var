import { assert } from 'chai';

import { AuditNumber } from './audit-number';
import { EmptyValueError, InvalidTypeError } from '../errors';
import { MaximumValueError, MinimumValueError } from './errors';

describe('Testing "./audit-number"', () => {
    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - mutable: false\n'
        +   '    - limiter: false\n'
        +   '    - min:     null\n'
        +   '    - max:     null'
    , () => {
        it('Value -> 5', () => {
            const boss = new AuditNumber();
            const resp = boss.audit(5);
            assert.strictEqual(resp, 5);
        });

        it('Value -> null', () => {
            try {
                const boss = new AuditNumber();
                boss.audit(null);
            } catch (err) {
                assert.instanceOf(err, EmptyValueError);
            }
        });

        it('Value -> undefined', () => {
            try {
                const boss = new AuditNumber();
                boss.audit(undefined);
            } catch (err) {
                assert.instanceOf(err, EmptyValueError);
            }
        });

        it('Value -> "joder chaval"', () => {
            try {
                const boss = new AuditNumber();
                boss.audit('joder chaval');
            } catch (err) {
                assert.instanceOf(err, InvalidTypeError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - mutable: false\n'
        +   '    - limiter: false\n'
        +   '    - min:     0\n'
        +   '    - max:     10'
    , () => {
        it('Value -> 5', () => {
            const boss = new AuditNumber({ min: 0, max: 10 });
            const resp = boss.audit(5);
            assert.strictEqual(resp, 5);
        });

        it('Value -> -1', () => {
            try {
                const boss = new AuditNumber({ min: 0, max: 10 });
                boss.audit(-1);
            } catch (err) {
                assert.instanceOf(err, MinimumValueError);
            }
        });

        it('Value -> 11', () => {
            try {
                const boss = new AuditNumber({ min: 0, max: 10 });
                boss.audit(11);
            } catch (err) {
                assert.instanceOf(err, MaximumValueError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: null\n'
        +   '    - mutable: true\n'
        +   '    - limiter: true\n'
        +   '    - min:     0\n'
        +   '    - max:     10'
    , () => {
        it('Value -> 5', () => {
            const boss = new AuditNumber({
                mutable: true, limiter: true,
                min: 0, max: 10
            });

            const resp = boss.audit(5);
            assert.strictEqual(resp, 5);
        });

        it('Value -> -1', () => {
            const boss = new AuditNumber({
                mutable: true, limiter: true,
                min: 0, max: 10
            });

            const resp = boss.audit(-1);
            assert.strictEqual(resp, 0);
        });

        it('Value -> 11', () => {
            const boss = new AuditNumber({
                mutable: true, limiter: true,
                min: 0, max: 10
            });

            const resp = boss.audit(11);
            assert.strictEqual(resp, 10);
        });
    });
});
