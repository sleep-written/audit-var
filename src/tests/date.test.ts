import test from 'ava';

import { InvalidJSONDateError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

test('new Date(2022, 11, 31)', t => {
    const target = new Date(2022, 11, 31);
    const auditor = new Auditor({ type: 'date' });

    const resp = auditor.audit(target);
    t.is(resp.getFullYear(), 2022);
    t.is(resp.getMonth(), 11);
    t.is(resp.getDate(), 31);
});

test('undefined; optional: false; NotOptionalError', t => {
    const target = undefined;
    const auditor = new Auditor({ type: 'date' });

    t.throws(
        () => { auditor.audit(target); },
        { instanceOf: NotOptionalError }
    );
});

test('undefined; optional: true', t => {
    const target = undefined;
    const auditor = new Auditor({ type: 'date', optional: true });

    const resp = auditor.audit(target);
    t.is(resp, undefined);
});

test('JSON: "2022-12-31T03:00:00.000Z"; OK', t => {
    const target = '2022-12-31T03:00:00.000Z';
    const auditor = new Auditor({ type: 'date', fromJSON: true });

    const resp = auditor.audit(target);
    t.is(resp.getFullYear(), 2022);
    t.is(resp.getMonth(), 11);
    t.is(resp.getDate(), 31);
});

test('JSON: "JajajjAJjajJA"; InvalidJSONDateError', t => {
    const target = 'JajajjAJjajJA';
    const auditor = new Auditor({ type: 'date', fromJSON: true });

    t.throws(
        () => { auditor.audit(target); },
        { instanceOf: InvalidJSONDateError }
    );
});