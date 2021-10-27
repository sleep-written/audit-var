import { assert } from 'chai';

import { InvalidTypeError } from '../errors';

import { AuditNull } from './audit-null';
import { AuditArray } from '../audit-array';
import { AuditNumber } from '../audit-number';
import { AuditObject, KeyNotFoundError } from '../audit-object';
import { AuditString } from '../audit-string';
import { AuditBoolean } from '../audit-boolean';

describe('Testing "./audit-null"', () => {
    it('Check AuditArray', () => {
        const auditor = new AuditNull(new AuditArray({
            items: new AuditNumber()
        }));
        const resp1 = auditor.audit([ 1, 2, 3 ]);
        assert.isArray(resp1);

        const resp2 = auditor.audit(null);
        assert.isNull(resp2);

        try {
            auditor.audit('lool');
        } catch (err) {
            assert.instanceOf(err, InvalidTypeError);
        }
    });

    it('Check AuditNumber', () => {
        const auditor = new AuditNull(new AuditNumber());
        const resp1 = auditor.audit(333);
        assert.isNumber(resp1);

        const resp2 = auditor.audit(null);
        assert.isNull(resp2);

        try {
            auditor.audit('lool');
        } catch (err) {
            assert.instanceOf(err, InvalidTypeError);
        }
    });

    it('Check AuditObject', () => {
        const auditor = new AuditNull(new AuditObject({
            keys: {
                id: new AuditNumber(),
                text: new AuditString()
            }
        }));
        const resp1 = auditor.audit({
            id: 111,
            text: 'jajajaja'
        });
        assert.isObject(resp1);
        assert.hasAllKeys(resp1, [ 'id', 'text' ]);

        const resp2 = auditor.audit(null);
        assert.isNull(resp2);

        try {
            auditor.audit(555);
        } catch (err) {
            assert.instanceOf(err, KeyNotFoundError);
        }
    });

    it('Check AuditString', () => {
        const auditor = new AuditNull(new AuditString());
        const resp1 = auditor.audit(':teriderp:');
        assert.isString(resp1);

        const resp2 = auditor.audit(null);
        assert.isNull(resp2);

        try {
            auditor.audit(555);
        } catch (err) {
            assert.instanceOf(err, InvalidTypeError);
        }
    });

    it('Check AuditBoolean', () => {
        const auditor = new AuditNull(new AuditBoolean());
        const resp1 = auditor.audit(true);
        assert.isBoolean(resp1);

        const resp2 = auditor.audit(null);
        assert.isNull(resp2);

        try {
            auditor.audit('lool');
        } catch (err) {
            assert.instanceOf(err, InvalidTypeError);
        }
    });

    it('Check inside of AuditObject', () => {
        const auditor = new AuditObject({
            keys: {
                id: new AuditNull(new AuditNumber({ min: 0 })),
                descript: new AuditString()
            }
        });

        const resp1 = auditor.audit({
            id: 555,
            descript: 'jajaja'
        });
        assert.hasAllKeys(resp1, [ 'id', 'descript' ]);
        assert.strictEqual(resp1.id, 555);
        assert.strictEqual(resp1.descript, 'jajaja');

        const resp2 = auditor.audit({
            descript: 'lol'
        });
        assert.hasAllKeys(resp2, [ 'descript' ]);
        assert.strictEqual(resp2.descript, 'lol');

        try {
            auditor.audit({
                id: 555
            });
        } catch (err) {
            assert.instanceOf(err, KeyNotFoundError);
        }
    })
});