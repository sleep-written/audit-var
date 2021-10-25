import { assert } from 'chai';
import { EmptyBooleanValueError, NotBooleanTypeError } from '.';
import { AuditBoolean } from './audit-boolean';

describe('Testing "./audit-boolean"', () => {
    describe('permissive = false', () => {
        it('value = false; OK', () => {
            const boss = new AuditBoolean();
            const resp = boss.audit(false);
            assert.isFalse(resp);
        });

        it('value = true; OK', () => {
            const boss = new AuditBoolean();
            const resp = boss.audit(true);
            assert.isTrue(resp);
        });

        it('value = null; FAIL', () => {
            try {
                const boss = new AuditBoolean();
                boss.audit(null);
            } catch (err) {
                assert.instanceOf(err, EmptyBooleanValueError);
            }
        });

        it('value = undefined; FAIL', () => {
            try {
                const boss = new AuditBoolean();
                boss.audit(undefined);
            } catch (err) {
                assert.instanceOf(err, EmptyBooleanValueError);
            }
        });

        it('value = 1; FAIL', () => {
            try {
                const boss = new AuditBoolean();
                boss.audit(1);
            } catch (err) {
                assert.instanceOf(err, NotBooleanTypeError);
            }
        });
    });

    describe('permissive = true', () => {
        it('value = false; OK', () => {
            const boss = new AuditBoolean(true);
            const resp = boss.audit(false);
            assert.isFalse(resp);
        });

        it('value = true; OK', () => {
            const boss = new AuditBoolean(true);
            const resp = boss.audit(true);
            assert.isTrue(resp);
        });

        it('value = null; OK', () => {
            const boss = new AuditBoolean(true);
            const resp = boss.audit(null);
            assert.isFalse(resp);
        });

        it('value = undefined; OK', () => {
            const boss = new AuditBoolean(true);
            const resp = boss.audit(undefined);
            assert.isFalse(resp);
        });

        it('value = 1; FAIL', () => {
            try {
                const boss = new AuditBoolean(true);
                boss.audit(1);
            } catch (err) {
                assert.instanceOf(err, NotBooleanTypeError);
            }
        });
    });
});