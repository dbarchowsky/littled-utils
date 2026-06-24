
/**
 * @typedef {Object} ConfigTestData
 * @property {String} testLabel - label for the test case
 * @property {Object|undefined} runtimeOptions - runtime options for the test case
 */

/**
 * @returns {ConfigTestData[]}
 */
export const configTestData = [
    {
        testLabel: 'test with runtime options',
        runtimeOptions: {
            routes: {
                api: {
                    customRoute: '/api/custom',
                },
                otherRoute: '/foo',
            },
            foo: 'bar',
        },
    },
    {
        testLabel: 'test without runtime options',
    }
];