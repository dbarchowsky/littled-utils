import {jest} from "@jest/globals";

/**
 * Mocks the fetch function to return a resolved promise with the given data.
 * @param {{}} data
 * @param {boolean} ok
 * @param {number} status
 */
export function mockFetchJson(data, ok = true, status = 200) {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        status,
        statusText: ok ? 'OK' : 'Error',
        json: async () => data
    });
}

/**
 * Mocks the fetch function to return a resolved promise with the given data and set response headers.
 * @param {{}} data
 * @param {{}} responseHeaders
 * @param {boolean} ok
 * @param {number} status
 * @param {string} statusText
 */
export function mockFetchHeaders(
    data,
    responseHeaders,
    ok = true,
    status = 200,
    statusText = 'Error') {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        status,
        statusText: ok ? 'OK' : statusText,
        headers: new Headers(responseHeaders),
        json: async () => data
    });
}
