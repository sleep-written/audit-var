import { assert } from 'chai';
import { EmptyValueError } from './empty-value-error';

describe('Testing "./errors/empty-value-error"', () => {
    it('expected = boolean', () => {
        const error = new EmptyValueError('boolean');
        assert.strictEqual(error.message,
                'The audit was expects a "boolean" value type, '
            +   'but the type received is null or undefined.'
        );
    });

    it('expected = array', () => {
        const error = new EmptyValueError('array');
        assert.strictEqual(error.message,
                'The audit was expects an "array" value type, '
            +   'but the type received is null or undefined.'
        );
    });
});
