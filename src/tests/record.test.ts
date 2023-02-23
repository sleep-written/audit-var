import test from 'ava';

import { Auditor } from '../auditor.js';
import { InvalidTypeError } from '../errors/index.js';

test('Test Record<string, string>', t => {
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
    t.deepEqual(result, targetOk);
    t.throws(
        () => { auditor.audit(targetEr) },
        { instanceOf: InvalidTypeError  }
    );
});

test('Test Record<string, { id: number; nick: string; }>', t => {
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
    t.deepEqual(resp, targetOk);
    t.throws(
        () => { auditor.audit(targetEr) },
        { instanceOf: InvalidTypeError }
    );
});