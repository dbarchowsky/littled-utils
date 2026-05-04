import {csrfUtils} from "./csrf.js";

/**
 * Get the headers required for API requests.
 * @return {Headers}
 */
export function getApiHeaders () {
    const headers = csrfUtils().getCSRFHeaders();
    headers.append ('Content-Type', 'application/json');
    headers.append ('Accept', 'application/json');
    return headers;
}

/**
 * Make an API request to the server.
 * @param {string} url
 * @param {{}} data
 * @return {Promise<any>}
 */
export async function makeApiRequest (url, data = {}) {
    const response = await makeApiRequestRaw (url, data);

    if (!response.ok) {
        throw new Error (`"The request could not be completed. Status: (${response.status}) ${response.statusText}`);
    }

    return await response.json ();
}

/**
 * Make an API request to the server.
 * @param {string} url
 * @param {{}} data
 * @return {Promise<any>}
 */
export async function makeApiRequestRaw (url, data = {}) {
    return fetch (url, {
        method: 'post',
        body: JSON.stringify (data),
        headers: getApiHeaders (),
    });
}
