import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError } from '../errors/index.js';
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
