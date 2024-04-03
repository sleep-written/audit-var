import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const auditor = new Auditor({
    type: 'enum',
    values: [555, 666, 777] as const
});

test('target = 555, target is 555 | 666 | 777', t => {
    const target = 555;
    const result = auditor.audit(target);
    t.is(result, 555);
});

test('target = 666, target is 555 | 666 | 777', t => {
    const target = 666;
    const result = auditor.audit(target);
    t.is(result, 666);
});

test('target = 777, target is 555 | 666 | 777', t => {
    const target = 777;
    const result = auditor.audit(target);
    t.is(result, 777);
});

test('target = 888, target is not 555 | 666 | 777', t => {
    t.throws(
        () => {
            const target = 888;
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});
