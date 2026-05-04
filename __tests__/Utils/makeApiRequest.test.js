import {describe, expect, test} from "@jest/globals";
import {mockFetchJson} from "../fixtures/mockFetch.js";
import {makeApiRequest} from "../../src/littled-utils.js";

describe('makeApiRequest', () => {
    test('Should return JSON from API endpoint', async () => {
        const mockResponse = {
            status: 'success',
            record_id: 1234
        };
        mockFetchJson(mockResponse);

        const response = await makeApiRequest('/api/endpoint', {key: 'value'});
        expect(response).toEqual(mockResponse);
    });

    test('Should throw error when API endpoint returns error ', async () => {
        const mockResponse = {error: 'Failure!'};
        mockFetchJson(mockResponse, false, 500);

        await expect(() => makeApiRequest('/api/endpoint')).rejects.toThrow(/request could not be completed. Status: \(500\) Error/);
    });
});