import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError, ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('record', () => {
    it('Test Record<string, string>', () => {
        const targetOk = {
            foo: 'bar',
            goo: 'baz'
        };

        const targetEr = {
            foo: 'bar',
            goo: 777
        };

        const auditor = new Auditor({
            type: 'record',
            items: { type: 'string' }
        });

        const result = auditor.audit(targetOk);
        deepStrictEqual(result, targetOk);
        throws(
            () => { auditor.audit(targetEr); },
            InvalidTypeError
        );
    });

    it('Test Record<string, { id: number; nick: string; }>', () => {
        const targetOk = {
            joder: { id: 666, nick: 'ghostlug' },
            shavo: { id: 666, nick: 'dir en grey' },
        };

        const targetEr = {
            joder: { id: 'lol', nick: 'ghostlug' },
            shavo: { id: 666, nick: 'dir en grey' },
        };

        const auditor = new Auditor({
            type: 'record',
            items: {
                type: 'object',
                keys: {
                    id: { type: 'number' },
                    nick: { type: 'string' }
                }
            }
        });

        const resp = auditor.audit(targetOk);
        deepStrictEqual(resp, targetOk);
        throws(
            () => { auditor.audit(targetEr); },
            InvalidTypeError
        );
    });
});

describe('record of dates and enums', () => {
    it('Test Record<string, Date>', () => {
        const targetOk = {
            foo: new Date('2022-12-31T03:00:00.000Z'),
            goo: new Date('2023-01-01T03:00:00.000Z')
        };

        const auditor = new Auditor({
            type: 'record',
            items: { type: 'date' }
        });

        deepStrictEqual(auditor.audit(targetOk), targetOk);
        throws(
            () => { auditor.audit({ foo: 'x' }); },
            InvalidTypeError
        );
    });

    it('Test Record<string, "a" | "b">', () => {
        const targetOk = {
            foo: 'a',
            goo: 'b'
        };

        const auditor = new Auditor({
            type: 'record',
            items: { type: 'enum', values: [ 'a', 'b' ] }
        });

        deepStrictEqual(auditor.audit(targetOk), targetOk);
        throws(
            () => { auditor.audit({ foo: 'a', goo: 'c' }); },
            ValueNotInEnumError
        );
    });
});
