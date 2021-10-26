import { assert } from 'chai';
import { AuditArray, AuditObject, AuditNumber, AuditString, KeyNotFoundError } from '.';

describe.only('Testing examples "./README.md"', () => {
    describe('Example 01', () => {
        interface Body {
            id: number;
            cod: string;
            descript: string;
            userIds: number[];
        }

        const auditor = new AuditObject<Body>({
            keys: {
                id: new AuditNumber(),
                cod: new AuditString(),
                descript: new AuditString(),
                userIds: new AuditArray<number>({
                    items: new AuditNumber()
                })
            }
        });

        it('Case 01 - OK', () => {
            const resp = auditor.audit({
                id: 55,
                cod: 'LOL',
                descript: 'Objeto destrozado',
                userIds: [ 55, 56, 57, 58 ]
            });

            assert.hasAllKeys(resp, [ 'id', 'cod', 'descript', 'userIds' ]);
            assert.sameOrderedMembers(resp.userIds, [ 55, 56, 57, 58 ]);
        });
    });
});