import {afterEach, describe, expect, test} from "@jest/globals";
import {settings} from "./fixtures/settings.js";
import {mockFetchHeaders} from "./fixtures/mockFetch.js";
import {csrfUtils} from "../src/index.js";

describe('setCSRF', () => {

    afterEach(() => {
        const meta = document.querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`);
        if (meta) {
            document.head.removeChild(meta);
        }
    });

    test('Updates CSRF token value stored in the document meta data after successful CSRF request', () => {

        const csrfToken = 'abc-123-def'

        // add csrf token meta tag to the document
        const meta = document.createElement('meta');
        meta.name = settings.selectors.csrfTokenId;
        meta.content = csrfToken;
        document.head.appendChild(meta);

        // call mock fetch, passing expected JSON and header responses
        const jsonResponse = {
            status: 'success',
            token: csrfToken
        };
        const responseHeaders = {'X-CSRF-Token': csrfToken};
        mockFetchHeaders(jsonResponse, responseHeaders);

        // execute the function
        const utils = csrfUtils(settings);
        utils.setCSRF();

        // confirm the csrf token is present in the meta tag
        const csrfMeta = document
            .querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`)
            ?.getAttribute('content') ?? '';
        expect(csrfMeta).toBe(csrfToken);
    });
});