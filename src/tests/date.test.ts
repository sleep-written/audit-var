import { strictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidJSONDateError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('date', () => {
    it('new Date(2022, 11, 31)', () => {
        const target = new Date(2022, 11, 31);
        const auditor = new Auditor({ type: 'date' });

        const resp = auditor.audit(target);
        strictEqual(resp.getFullYear(), 2022);
        strictEqual(resp.getMonth(), 11);
        strictEqual(resp.getDate(), 31);
    });

    it('undefined; optional: false; NotOptionalError', () => {
        const target = undefined;
        const auditor = new Auditor({ type: 'date' });

        throws(
            () => { auditor.audit(target); },
            NotOptionalError
        );
    });

    it('undefined; optional: true', () => {
        const target = undefined;
        const auditor = new Auditor({ type: 'date', optional: true });

        const resp = auditor.audit(target);
        strictEqual(resp, undefined);
    });

    it('JSON: "2022-12-31T03:00:00.000Z"; OK', () => {
        const target = '2022-12-31T03:00:00.000Z';
        const auditor = new Auditor({ type: 'date', fromJSON: true });

        const resp = auditor.audit(target);
        strictEqual(resp.getFullYear(), 2022);
        strictEqual(resp.getMonth(), 11);
        strictEqual(resp.getDate(), 31);
    });

    it('JSON: "JajajjAJjajJA"; InvalidJSONDateError', () => {
        const target = 'JajajjAJjajJA';
        const auditor = new Auditor({ type: 'date', fromJSON: true });

        throws(
            () => { auditor.audit(target); },
            InvalidJSONDateError
        );
    });
});
