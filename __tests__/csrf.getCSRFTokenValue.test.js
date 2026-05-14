import {afterEach, describe, expect, it} from "@jest/globals";
import {settings} from "./fixtures/settings.js";
import {mockFetchHeaders} from "./fixtures/mockFetch.js";
import {csrfUtils} from "../src/index.js";
import {addMetaTag} from "./fixtures/addMetaElement.js";

describe('getCSRFTokenValue', () => {

    const docToken = 'csrf-from-document';
    const apiToken = 'csrf-from-api';
    const responseData = {status: 'success', csrf_token: apiToken};

    afterEach(() => {
        document.head.innerHTML = '';
        const meta = document.querySelector(`meta[name="${settings.selectors.csrfTokenId}"]`);
        if (meta) {
            document.head.removeChild(meta);
        }
    });

    it("Should retrieve the CSRF token from the document if available", async () => {
        document.head.innerHTML = `<meta name="${settings.selectors.csrfTokenId}" content="${docToken}">`;

        mockFetchHeaders(responseData, {'X-CSRF-Token': apiToken}, true, 200);

        const token = await csrfUtils().getCSRFTokenValue();
        expect(token).toBe(docToken);
    });

    it("Should retrieve the CSRF token from the api if it's not present in the document", async () => {
        mockFetchHeaders(responseData, {'X-CSRF-Token': apiToken}, true, 200);

        const token = await csrfUtils().getCSRFTokenValue();
        expect(token).toBe(apiToken);
    });

    it("Should retrieve the CSRF token from the api if no value is present in the document", async () => {
        addMetaTag(settings.selectors.csrfTokenId, '');

        mockFetchHeaders(responseData, {'X-CSRF-Token': apiToken}, true, 200);

        const token = await csrfUtils().getCSRFTokenValue();
        expect(token).toBe(apiToken);
    });

    it("Should throw an error if not present in the document and not available in the api", async () => {
        mockFetchHeaders(responseData, {'X-CSRF-Token': ''}, true, 200);

        await expect(csrfUtils().getCSRFTokenValue())
            .rejects
            .toThrow('Token is not available.');
    });

});