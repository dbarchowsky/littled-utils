/**
 * @typedef {Object} LookupValueTestData
 * @property {string} label - label for the test case
 * @property {int|string|int[]|string[]} needle - value to look up
 * @property {Array|Object} haystack - array to search
 * @property {*} expected - expected output
 */

export const lookupValueTestData = () => [
    {
        label: 'Should return value matching needle',
        needle: 'b',
        haystack: {
            'a': 1,
            'b': 2,
            'c': 3,
        },
        expected: 2
    },
    {
        label: 'Should return value matching first matching key from needle',
        needle: ['c', 'd'],
        haystack: {
            'a': 1,
            'b': 2,
            'c': 3,
            'd': 4,
        },
        expected: 3
    },
    {
        label: 'Should return value matching alternate first matching key from needle',
        needle: ['d', 'c'],
        haystack: {
            'a': 1,
            'b': 2,
            'c': 3,
            'd': 4,
        },
        expected: 4
    },
    {
        label: 'Should return value from array',
        needle: [2,0],
        haystack: ['a', 'b', 'c', 'd'],
        expected: 'c'
    },
    {
        label: 'Should first value from array',
        needle: 0,
        haystack: ['a', 'b', 'c', 'd'],
        expected: 'a'
    },
    {
        label: 'Should return undefined if no match',
        needle: 4,
        haystack: ['a', 'b', 'c', 'd'],
        expected: undefined
    },
    {
        label: 'Should return undefined if no match using string value for key',
        needle: 'crazy-town',
        haystack: {
            foo: 'bar',
            biz: 'bash',
        },
        expected: undefined
    },
    {
        label: 'Should ignore keys not present in haystack',
        needle: ['a', 'b', 'f'],
        haystack: {
            'f': 76,
            'g': 65,
        },
        expected: 76
    },
]