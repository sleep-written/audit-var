import test from 'ava';
import { Auditor } from '../auditor.js';
import { ValueNotInEnumError, NotOptionalError } from '../errors/index.js';

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

// Test para un campo opcional con un valor válido
test('optional field with a valid value', t => {
    const target = 'foo';
    const result = auditorOptional.audit(target);
    t.is(result, 'foo');
});

// Test para un campo opcional sin valor (undefined)
test('optional field with no value (input = undefined)', t => {
    const target = undefined;
    const result = auditorOptional.audit(target);
    t.is(result, undefined);
});

// Test para un campo opcional sin valor (null)
test('optional field with no value (input = null)', t => {
    const target = null;
    const result = auditorOptional.audit(target);
    t.is(result, undefined);
});

// Test para un campo no opcional sin valor (debería lanzar un error)
test('non-optional field with no value', t => {
    t.throws(
        () => {
            const target = undefined;
            auditorNonOptional.audit(target);
        },
        {
            instanceOf: NotOptionalError
        }
    );
});

// Test para un campo opcional con un valor no permitido (debería lanzar un error)
test('optional field with an invalid value', t => {
    t.throws(
        () => {
            const target = 'notAllowedValue';
            auditorOptional.audit(target);
        },
        {
            instanceOf: ValueNotInEnumError
        }
    );
});
