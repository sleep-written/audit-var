import { strictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const date1 = new Date('2023-01-01T00:00:00.000Z');
const date2 = new Date('2023-06-01T00:00:00.000Z');
const date3 = new Date('2023-12-31T23:59:59.999Z');

const auditor = new Auditor({
    type: 'enum',
    values: [date1, date2, date3] as const
});

describe('enum.case-07', () => {
    it('target matches one of the enum dates', () => {
        const target = new Date('2023-06-01T00:00:00.000Z');
        const result = auditor.audit(target);
        strictEqual(result.getTime(), date2.getTime());
    });

    it('target does not match any of the enum dates', () => {
        throws(
            () => {
                const target = new Date('2022-12-31T23:59:59.999Z');
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
