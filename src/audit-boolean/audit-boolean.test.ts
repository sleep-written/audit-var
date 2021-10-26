import { assert } from 'chai';
import { AuditBoolean } from './audit-boolean';
import { EmptyValueError, InvalidTypeError } from '../errors';

describe('Testing "./audit-boolean"', () => {
    describe(
            'Options:\n'
        +   '    - default: null'
    , () => {
        it('value -> false', () => {
            const boss = new AuditBoolean();
            const resp = boss.audit(false);
            assert.isFalse(resp);
        });

        it('value -> true', () => {
            const boss = new AuditBoolean();
            const resp = boss.audit(true);
            assert.isTrue(resp);
        });

        it('value -> null', () => {
            try {
                const boss = new AuditBoolean();
                boss.audit(null);
            } catch (err) {
                assert.instanceOf(err, EmptyValueError);
            }
        });

        it('value -> undefined', () => {
            try {
                const boss = new AuditBoolean();
                boss.audit(undefined);
            } catch (err) {
                assert.instanceOf(err, EmptyValueError);
            }
        });

        it('value -> 1', () => {
            try {
                const boss = new AuditBoolean();
                boss.audit(1);
            } catch (err) {
                assert.instanceOf(err, InvalidTypeError);
            }
        });
    });

    describe(
            'Options:\n'
        +   '    - default: false'
    , () => {
        it('value -> false', () => {
            const boss = new AuditBoolean({ default: false });
            const resp = boss.audit(false);
            assert.isFalse(resp);
        });

        it('value -> true', () => {
            const boss = new AuditBoolean({ default: false });
            const resp = boss.audit(true);
            assert.isTrue(resp);
        });

        it('value -> null', () => {
            const boss = new AuditBoolean({ default: false });
            const resp = boss.audit(null);
            assert.isFalse(resp);
        });

        it('value -> undefined', () => {
            const boss = new AuditBoolean({ default: false });
            const resp = boss.audit(undefined);
            assert.isFalse(resp);
        });

        it('value -> 1', () => {
            try {
                const boss = new AuditBoolean({ default: false });
                boss.audit(1);
            } catch (err) {
                assert.instanceOf(err, InvalidTypeError);
            }
        });
    });
});
