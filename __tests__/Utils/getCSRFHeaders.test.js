import {afterEach, describe, expect, test} from '@jest/globals';
import {settings} from '../fixtures/settings.js';
import {createLittledUtils} from '../../src/littled-utils.js';

describe('getCSRFHeaders', () => {

    const csrfToken = 'test-csrf-token';

    afterEach(() => {
        const meta = document.querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`);
        if (meta) {
            document.head.removeChild(meta);
        }
    });

    test('returns Headers containing the CSRF token and content type', () => {
        const meta = document.createElement('meta');
        meta.name = settings.selectors.csrfTokenId;
        meta.content = csrfToken;
        document.head.appendChild(meta);

        const utils = createLittledUtils(settings);
        const headers = utils.getCSRFHeaders();

        expect(headers).toBeInstanceOf(Headers);
        expect(headers.get('X-CSRF-Token')).toBe(csrfToken);
    });

    test('returns empty Headers if CSRF token is not found', () => {

        const utils = createLittledUtils(settings);
        const headers = utils.getCSRFHeaders();

        expect(headers).toBeInstanceOf(Headers);
        expect(headers.has('X-CSRF-Token')).toBe(true);
        expect(headers.get('X-CSRF-Token')).toBe('');
    })
});
