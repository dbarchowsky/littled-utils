import {afterEach, describe, expect, it} from "@jest/globals";
import {settings} from "./fixtures/settings.js";
import {mockFetchHeaders} from "./fixtures/mockFetch.js";
import {csrfUtils} from "../src/index.js";
import {addMetaTag} from "./fixtures/addMetaElement.js";

describe('setCSRF', () => {

    const apiToken = 'abc-123-def'

    afterEach(() => {
        const meta = document.querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`);
        if (meta) {
            document.head.removeChild(meta);
        }
    });

    it('Should update CSRF token value stored in the document meta data after successful CSRF request', async () => {
        // add csrf token meta tag to the document
        addMetaTag(settings.selectors.csrfTokenId, '');

        // call mock fetch, passing expected JSON and header responses
        const jsonResponse = {
            status: 'success',
            token: apiToken
        };
        const responseHeaders = {'X-CSRF-Token': apiToken};
        mockFetchHeaders(jsonResponse, responseHeaders);

        // execute the function
        const utils = csrfUtils(settings);
        await utils.setCSRF();

        // confirm the csrf token is present in the meta tag
        const csrfMeta = document
            .querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`)
            ?.getAttribute('content') ?? '';
        expect(csrfMeta).toBe(apiToken);
    });

    it("Should throw an error if the api request fails", async () => {
        addMetaTag(settings.selectors.csrfTokenId, '');

        mockFetchHeaders({}, {}, false, 500, 'Internal Server Error');

        await expect(csrfUtils(settings).setCSRF())
            .rejects
            .toThrow('Error setting token. Error retrieving token. [500] Internal Server Error');
    });

    it("Should throw an error if the api returns an empty value", async () => {
        addMetaTag(settings.selectors.csrfTokenId, '');

        const mockData = { status: 'success' };
        const mockHeaders = {'X-CSRF-Token': ''};
        mockFetchHeaders(mockData, mockHeaders, true, 200);

        await expect(csrfUtils(settings).setCSRF())
            .rejects
            .toThrow('Token is not available.');
    });
});