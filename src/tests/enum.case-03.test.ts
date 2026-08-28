import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const auditor = new Auditor({
    type: 'enum',
    values: [
        { id: 55, text: 'lel' },
        { id: 66, text: 'lol' },
        { id: 99, text: 'kek' }
    ] as const
});

describe('enum.case-03', () => {
    it('target = { id: 55, text: "lel" }, target matches one of the enum objects', () => {
        const target = { id: 55, text: 'lel' };
        const result = auditor.audit(target);
        deepStrictEqual(result, { id: 55, text: 'lel' });
    });

    it('target = { id: 66, text: "lol" }, target matches one of the enum objects', () => {
        const target = { id: 66, text: 'lol' };
        const result = auditor.audit(target);
        deepStrictEqual(result, { id: 66, text: 'lol' });
    });

    it('target = { id: 99, text: "kek" }, target matches one of the enum objects', () => {
        const target = { id: 99, text: 'kek' };
        const result = auditor.audit(target);
        deepStrictEqual(result, { id: 99, text: 'kek' });
    });

    it('target = { id: 77, text: "lul" }, target does not match any of the enum objects', () => {
        throws(
            () => {
                const target = { id: 77, text: 'lul' };
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
