import { assert } from 'chai';

import { AuditObject } from './audit-object';
import { AuditString } from '../audit-string';
import { AuditBoolean } from '../audit-boolean';

describe('Testing "./audit-object"', () => {
    describe('Interface A', () => {
        interface Body {
            disabled: boolean;
            value: string;
        }

        it('Test 01', () => {
            const boss = new AuditObject<Body>({
                mutable: false,
                keys: {
                    disabled: new AuditBoolean(),
                    value: new AuditString(),
                }
            });
    
            const resp = boss.audit({
                disabled: false,
                value: 'jajaja',
            });
    
            assert.hasAllKeys(resp, [ 'value', 'disabled' ]);
            assert.strictEqual(resp.value, 'jajaja');
            assert.isFalse(resp.disabled);
        });
        
        it('Test 02', () => {
            const boss = new AuditObject<Body>({
                mutable: false,
                keys: {
                    disabled: new AuditBoolean(),
                    value: new AuditString({ trim: true, min: 3, max: 8 }),
                }
            });
    
            const resp = boss.audit({
                disabled: false,
                value: '        jajaja          ',
            });
    
            assert.hasAllKeys(resp, [ 'value', 'disabled' ]);
            assert.strictEqual(resp.value, '        jajaja          ');
            assert.isFalse(resp.disabled);
        }).timeout;
        
        it('Test 03', () => {
            const boss = new AuditObject<Body>({
                mutable: true,
                keys: {
                    disabled: new AuditBoolean(),
                    value: new AuditString({ trim: true }),
                }
            });
    
            const resp = boss.audit({
                disabled: false,
                value: '        jajaja          ',
            });
    
            assert.hasAllKeys(resp, [ 'value', 'disabled' ]);
            assert.strictEqual(resp.value, 'jajaja');
            assert.isFalse(resp.disabled);
        });
    });
});
