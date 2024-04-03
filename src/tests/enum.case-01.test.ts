import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError } from '../errors/index.js';

const auditor = new Auditor({
    type: 'enum',
    values: [ 'foo', 'bar' ] as const
});

test('target = "foo", target is "foo" | "bar"', t => {
    const target = 'foo';
    const result = auditor.audit(target);
    t.is(result, 'foo');
});

test('target = "bar", target is "foo" | "bar"', t => {
    const target = 'bar';
    const result = auditor.audit(target);
    t.is(result, 'bar');
});

test('target = "baz", target is not "foo" | "bar"', t => {
    t.throws(
        () => {
            const target = 'baz';
            auditor.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});