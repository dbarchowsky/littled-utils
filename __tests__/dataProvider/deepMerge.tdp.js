/**
 * @typedef {Object} DeepMergeTestData
 * @property {string} label - label for the test case
 * @property {Object} target - target object to merge into
 * @property {Object[]} sources - input objects to merge
 * @property {Object} expected - expected output
 */

/**
 *
 * @returns {DeepMergeTestData[]}
 */
export const deepMergeTestData = () => [
    {
        label: 'merge two objects',
        target: {},
        sources: [{a: 1}, {b: 2}],
        expected: {a: 1, b: 2}
    },
    {
        label: 'merge with overlapping keys',
        target: {},
        sources: [
            {
                keys: {
                    a: 1,
                    b: 2,
                    d: 5,
                    sub: {
                        c: 3
                    }
                }
            },
            {
                b: 2,
                keys: {
                    a: 87,
                    f: 23
                }
            }
        ],
        expected: {
            b: 2,
            keys: {
                a: 87,
                b: 2,
                d: 5,
                f: 23,
                sub: {
                    c: 3
                }
            }
        }
    },
    {
        label: 'merge multiple objects',
        target: {},
        sources: [
            {
                a: 1,
                data: {
                    invoiceId: 2314,
                    productId: 19,
                    quantity: 2,
                }
            },
            {
                b: 2,
                data: {
                    productId: 22,
                }
            },
            {
                d: 4,
                data: {
                    quantity: 1,
                    promoId: 10,
                }
            }
        ],
        expected: {
            a: 1,
            b: 2,
            d: 4,
            data: {
                invoiceId: 2314,
                productId: 22,
                quantity: 1,
                promoId: 10,
            }
        }
    },
    {
        label: 'Merge with target',
        target: {
            foo: 'bar',
            biz: 'bash'
        },
        sources: [
            {
                biz: 'baloney',
                barn: 'bark'
            }
        ],
        expected: {
            foo: 'bar',
            biz: 'baloney',
            barn: 'bark'
        }
    }
];
