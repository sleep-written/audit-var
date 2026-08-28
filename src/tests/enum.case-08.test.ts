import { strictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { ValueNotInEnumError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

// Enum que incluye tanto valores primitivos como la opción `optional`
const auditorOptional = new Auditor({
    type: 'enum',
    values: ['foo', 'bar', 123, true] as const,
    optional: true
});

const auditorNonOptional = new Auditor({
    type: 'enum',
    values: ['foo', 'bar', 123, true] as const,
    optional: false
});

describe('enum.case-08', () => {
    // Test para un campo opcional con un valor válido
    it('optional field with a valid value', () => {
        const target = 'foo';
        const result = auditorOptional.audit(target);
        strictEqual(result, 'foo');
    });

    // Test para un campo opcional sin valor (undefined)
    it('optional field with no value (input = undefined)', () => {
        const target = undefined;
        const result = auditorOptional.audit(target);
        strictEqual(result, undefined);
    });

    // Test para un campo opcional sin valor (null)
    it('optional field with no value (input = null)', () => {
        const target = null;
        const result = auditorOptional.audit(target);
        strictEqual(result, undefined);
    });

    // Test para un campo no opcional sin valor (debería lanzar un error)
    it('non-optional field with no value', () => {
        throws(
            () => {
                const target = undefined;
                auditorNonOptional.audit(target);
            },
            NotOptionalError
        );
    });

    // Test para un campo opcional con un valor no permitido (debería lanzar un error)
    it('optional field with an invalid value', () => {
        throws(
            () => {
                const target = 'notAllowedValue';
                auditorOptional.audit(target);
            },
            ValueNotInEnumError
        );
    });
});
