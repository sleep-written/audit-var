import { assert } from 'chai';

import { InvalidTypeError } from '../errors';

import { AuditArray } from './audit-array';
import { AuditObject } from '../audit-object';
import { AuditNumber, MaximumValueError } from '../audit-number';
import { AuditString, MaximumStringLengthError } from '../audit-string';
import { MaximumArrayLengthError } from './errors';

describe.only('Testing "./audit-array"', () => {
    describe('Array Type A', () => {
        it('Case 01', () => {
            const boss = new AuditArray({
                items: new AuditString()
            });

            const resp = boss.audit([
                'Ajajja',
                'dale men relax',
                'chaval'
            ]);

            assert.isArray(resp);
            assert.sameOrderedMembers(resp, [
                'Ajajja',
                'dale men relax',
                'chaval'
            ]);
        });

        it('Case 02', () => {
            const boss = new AuditArray({
                items: new AuditNumber({ min: 0, max: 10 })
            });

            try {
                boss.audit([ 0, 2, 55, 3 ]);
            } catch (err) {
                assert.instanceOf(err, MaximumValueError);
            }
        });

        it('Case 03', () => {
            const boss = new AuditArray({
                max: 2,
                cut: true,
                items: new AuditNumber({ min: 0, max: 10 })
            });

            const resp = boss.audit([ 0, 2, 4, 6 ]);
            assert.isArray(resp);
            assert.lengthOf(resp, 2);
            assert.sameMembers(resp, [ 0, 2 ]);
        });

        it('Case 04', () => {
            const boss = new AuditArray({
                max: 2,
                items: new AuditNumber({ min: 0, max: 10 })
            });

            try {
                boss.audit([ 0, 2, 4, 6 ]);
            } catch (err) {
                assert.instanceOf(err, MaximumArrayLengthError);
            }
        });
    });

    describe('Array Type B', () => {
        interface Body {
            id: number;
            name: string;
        }

        it('Case 01', () => {
            const boss = new AuditArray({
                items: new AuditObject<Body>({
                    keys: {
                        id: new AuditNumber({ min: 0 }),
                        name: new AuditString({ min: 3, max: 20 })
                    }
                })
            });

            try {
                boss.audit([
                    {
                        id: 'dfsdf',
                        name: 888
                    }
                ]);
            } catch (err) {
                assert.instanceOf(err, InvalidTypeError);
            }
        });

        
    });

    describe('Array Type C', () => {
        interface Body {
            id: number;
            cod: string;
            descript: string;
        }

        it('Case 01', () => {
            const boss = new AuditArray({
                items: new AuditObject<Body>({
                    keys: {
                        id: new AuditNumber(),
                        cod: new AuditString(),
                        descript: new AuditString()
                    }
                })
            });

            const resp = boss.audit([
                {
                    id: 1,
                    cod: 'ATH',
                    descript: 'jajajaj'
                },
                {
                    id: 2,
                    cod: 'ATX',
                    descript: 'jojoj'
                },
                {
                    id: 3,
                    cod: 'LTD',
                    descript: 'sldiufhlw'
                }
            ]);

            assert.isArray(resp);
            assert.lengthOf(resp, 3);
            
            for (const item of resp) {
                assert.hasAllKeys(item, [ 'id', 'cod', 'descript' ]);
            }
        });

        it('Case 02', () => {
            const boss = new AuditArray({
                items: new AuditObject<Body>({
                    keys: {
                        id: new AuditNumber(),
                        cod: new AuditString(),
                        descript: new AuditString({ max: 4 })
                    }
                })
            });

            try {
                boss.audit([
                    {
                        id: 1,
                        cod: 'ATH',
                        descript: 'jajajaj'
                    },
                    {
                        id: 2,
                        cod: 'ATX',
                        descript: 'jojoj'
                    },
                    {
                        id: 3,
                        cod: 'LTD',
                        descript: 'sldiufhlw'
                    }
                ]);
            } catch (err) {
                assert.instanceOf(err, MaximumStringLengthError);
            }
        });
    });
});
