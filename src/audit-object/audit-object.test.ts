import { assert } from 'chai';

import { AuditObject } from './audit-object';
import { AuditString } from '../audit-string';
import { AuditBoolean } from '../audit-boolean';
import { AuditNumber } from '../audit-number/audit-number';

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

    describe('Interface B', () => {
        interface Type {
            id: number;
            cod: string;
        }

        interface User {
            id: number;
            nick: string;
            pass: string;
            type: Type;
        }

        it('Test 01', () => {
            const boss = new AuditObject<User>({
                keys: {
                    id: new AuditNumber({ min: 1 }),
                    nick: new AuditString({ min: 4 }),
                    pass: new AuditString({ min: 8 }),
                    type: new AuditObject<Type>({
                        keys: {
                            id: new AuditNumber({ min: 1 }),
                            cod: new AuditString({ min: 3, max: 3 })
                        }
                    })
                }
            });

            const resp = boss.audit({
                id: 66,
                nick: 'test-user',
                pass: 'KJnlkH87&876ghfJHgfjh',
                type: {
                    id: 2,
                    cod: 'POW'
                }
            });

            assert.isObject(resp);
            assert.hasAllKeys(resp, [ 'id', 'nick', 'pass', 'type' ]);
            assert.hasAllKeys(resp.type, [ 'id', 'cod' ]);
        });

        it('Test 02', () => {
            const boss = new AuditObject<User>({
                keys: {
                    id: new AuditNumber({ min: 1 }),
                    nick: new AuditString({ min: 4 }),
                    pass: new AuditString({ min: 8 }),
                    type: new AuditObject<Type>({
                        keys: {
                            id: new AuditNumber({ min: 1 }),
                            cod: new AuditString({
                                mutable: true,
                                cut: true,
                                min: 3,
                                max: 3
                            })
                        }
                    })
                }
            });

            const resp = boss.audit({
                id: 55,
                nick: 'test-user',
                pass: 'KJnlkH87&876ghfJHgfjh',
                type: {
                    id: 2,
                    cod: 'POWERSHELL'
                }
            });

            assert.isObject(resp);
            assert.hasAllKeys(resp, [ 'id', 'nick', 'pass', 'type' ]);
            assert.hasAllKeys(resp.type, [ 'id', 'cod' ]);
            assert.strictEqual(resp.type.cod, 'POW');
        }).timeout(Number.MAX_SAFE_INTEGER);
    });
});
