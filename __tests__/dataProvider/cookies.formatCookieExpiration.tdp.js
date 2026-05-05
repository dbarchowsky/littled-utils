/**
 * @typedef {Object} FormatCookieExpirationTestData
 * @property {string} label - label for the test case
 * @property {Number} hours - Number of hours to convert to a date string
 * @property {String} expected - expected output
 */

/**
 *
 * @returns {FormatCookieExpirationTestData[]}
 */
export const formatCookieExpirationTestData = () => [
    {
        label: 'convert 1 hour to a date string',
        hours: 1,
        expected: 'Tue, 01 Jan 2024 00:00:00 GMT'
    }
];