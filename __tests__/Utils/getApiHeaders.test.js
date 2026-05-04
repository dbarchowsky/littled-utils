import {afterEach, describe, expect, test} from "@jest/globals";
import {settings} from "../fixtures/settings.js";
import {getApiHeaders} from "../../src/littled-utils.js";

describe('getApiHeaders', () => {

    const csrfToken = 'test-csrf-token';

    afterEach(() => {
        const meta = document.querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`);
        if (meta) {
            document.head.removeChild(meta);
        }
    });

    test('Should return expected headers', async () => {

        const expected = {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Add meta tag that stores the CSRF token to the document
        const meta = document.createElement('meta');
        meta.name = settings.selectors.csrfTokenId;
        meta.content = csrfToken;
        document.head.appendChild(meta);

        const headers = getApiHeaders();

        expect(headers).toBeInstanceOf(Headers);
        for (const [key, value] of Object.entries(expected)) {
            expect(headers.get(key)).toBe(value);
        }
    });
});