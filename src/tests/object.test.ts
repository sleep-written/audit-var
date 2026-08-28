import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { InvalidTypeError, NotOptionalError } from '../errors/index.js';
import { Auditor } from '../auditor.js';

describe('object', () => {
    it('{ text: string, value: number }; OK', () => {
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
        deepStrictEqual(result, target);
    });

    it('{ text: string, value: number }; NotOptionalError', () => {
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

        throws(
            () => { auditor.audit(target); },
            NotOptionalError
        );
    });

    it('{ id: number, songs: string[] }; OK', () => {
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
        deepStrictEqual(resp, target);
    });

    it('{ id: number, songs: string[] }; InvalidTypeError', () => {
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

        throws(
            () => { auditor.audit(target); },
            InvalidTypeError
        );
    });
});
