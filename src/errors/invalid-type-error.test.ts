import { assert } from 'chai';
import { InvalidTypeError } from './invalid-type-error';

describe('Testing "./errors/invalid-type-error"', () => {
    it('expected = boolean; actual = null', () => {
        const error = new InvalidTypeError('boolean', 'null');
        assert.strictEqual(error.message,
                'The audit was expects a "boolean" value type, '
            +   'but the type received is a "null" type.'
        );
    });

    it('expected = array; actual = undefined', () => {
        const error = new InvalidTypeError('array', 'undefined');
        assert.strictEqual(error.message,
                'The audit was expects an "array" value type, '
            +   'but the type received is an "undefined" type.'
        );
    });
});
