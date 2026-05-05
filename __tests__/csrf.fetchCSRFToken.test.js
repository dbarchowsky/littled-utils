import {describe, expect, it} from "@jest/globals";
import {csrfUtils} from "../src/index.js";
import {mockFetchHeaders} from "./fixtures/mockFetch.js";

describe('fetchCSRFToken', () => {

    it('Should return CSRF token', async () => {
        const mockData = { status: 'success' };
        const csrfToken = 'test-token-123';
        mockFetchHeaders(mockData, {'X-CSRF-Token': csrfToken});

        const token = await csrfUtils().fetchCSRFToken();
        expect(token).toBe(csrfToken);
    });

    it('Should throw error on HTTP error', async () => {
        mockFetchHeaders({}, {}, false, 500, 'Internal Server Error');
        await expect(csrfUtils().fetchCSRFToken()).rejects.toThrow('Error retrieving token. [500] Internal Server Error');
    })

    it("Should return empty string if the api does not return a value", async () => {
        const mockData = { status: 'success' };
        const mockHeaders = {'X-CSRF-Token': ''};
        mockFetchHeaders(mockData, mockHeaders, true, 200);

        const token = await csrfUtils().fetchCSRFToken();
        expect(token).toBe('');
    })
});