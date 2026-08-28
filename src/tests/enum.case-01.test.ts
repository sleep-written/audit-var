import { strictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const auditor = new Auditor({
    type: 'enum',
    values: [ 'foo', 'bar' ] as const
});

describe('enum.case-01', () => {
    it('target = "foo", target is "foo" | "bar"', () => {
        const target = 'foo';
        const result = auditor.audit(target);
        strictEqual(result, 'foo');
    });

    it('target = "bar", target is "foo" | "bar"', () => {
        const target = 'bar';
        const result = auditor.audit(target);
        strictEqual(result, 'bar');
    });

    it('target = "baz", target is not "foo" | "bar"', () => {
        throws(
            () => {
                const target = 'baz';
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
