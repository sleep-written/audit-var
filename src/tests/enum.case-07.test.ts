import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const date1 = new Date('2023-01-01T00:00:00.000Z');
const date2 = new Date('2023-06-01T00:00:00.000Z');
const date3 = new Date('2023-12-31T23:59:59.999Z');

const auditor = new Auditor({
    type: 'enum',
    values: [date1, date2, date3] as const
});

test('target matches one of the enum dates', t => {
    const target = new Date('2023-06-01T00:00:00.000Z');
    const result = auditor.audit(target);
    t.true(result.getTime() === date2.getTime());
});

test('target does not match any of the enum dates', t => {
    t.throws(
        () => {
            const target = new Date('2022-12-31T23:59:59.999Z');
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});
