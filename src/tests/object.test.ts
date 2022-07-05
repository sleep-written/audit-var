import test from 'ava';

import { NotOptionalError, InvalidTypeError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

test('{ text: string, value: number }; OK', t => {
    const target = {
        text: 'jajaja',
        value: 666
    };

    const auditor = new Auditor({
        type: 'object',
        keys: {
            text: { type: 'string' },
            value: { type: 'number' }
        }
    });

    const result = auditor.audit(target);
    t.deepEqual(result, target);
});

test('{ text: string, value: number }; NotOptionalError', t => {
    const target = {
        text: 'jajaja',
        joder: 'chaval'
    };

    const auditor = new Auditor({
        type: 'object',
        keys: {
            text: { type: 'string' },
            value: { type: 'number' }
        }
    });

    t.throws(
        () => { auditor.audit(target); },
        { instanceOf: NotOptionalError }
    );
});

test('{ id: number, songs: string[] }; OK', t => {
    const target = {
        id: 555,
        songs: [
            'Sigh',
            'Trance to the Sun',
            'With Mouthfulls of Blood',
            'The Black Ark'
        ]
    };

    const auditor = new Auditor({
        type: 'object',
        keys: {
            id: { type: 'number' },
            songs: {
                type: 'array',
                items: { type: 'string' }
            }
        }
    });

    const resp = auditor.audit(target);
    t.deepEqual(resp, target);
});

test('{ id: number, songs: string[] }; InvalidTypeError', t => {
    const target = {
        id: 555,
        songs: [
            'Sigh',
            'Trance to the Sun',
            999,
            'The Black Ark'
        ]
    };

    const auditor = new Auditor({
        type: 'object',
        keys: {
            id: { type: 'number' },
            songs: {
                type: 'array',
                items: { type: 'string' }
            }
        }
    });

    t.throws(
        () => { auditor.audit(target); },
        { instanceOf: InvalidTypeError }
    );
});