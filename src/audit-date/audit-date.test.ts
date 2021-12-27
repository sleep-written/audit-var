import { assert } from 'chai';
import { AuditDate } from './audit-date';

describe('Testing "./audit-date"', () => {
    it('From Date', () => {
        const refe = new Date();
        const subj = new AuditDate();
        subj.audit(refe);
    });

    it('From JSON String', () => {
        const refe = new Date().toJSON();
        const subj = new AuditDate({ fromJSON: true });
        const resp = subj.audit(refe);

        assert.instanceOf(resp, Date);
    });
});
