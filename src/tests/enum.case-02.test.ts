import { strictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

const auditor = new Auditor({
    type: 'enum',
    values: [555, 666, 777] as const
});

describe('enum.case-02', () => {
    it('target = 555, target is 555 | 666 | 777', () => {
        const target = 555;
        const result = auditor.audit(target);
        strictEqual(result, 555);
    });

    it('target = 666, target is 555 | 666 | 777', () => {
        const target = 666;
        const result = auditor.audit(target);
        strictEqual(result, 666);
    });

    it('target = 777, target is 555 | 666 | 777', () => {
        const target = 777;
        const result = auditor.audit(target);
        strictEqual(result, 777);
    });

    it('target = 888, target is not 555 | 666 | 777', () => {
        throws(
            () => {
                const target = 888;
                auditor.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
