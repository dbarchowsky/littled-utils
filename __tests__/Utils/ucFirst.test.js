import {describe, expect, test} from '@jest/globals';
import {ucFirst} from "../../src/index.js";

describe('SiteUtils.ucFirst()', () => {
    test.each`
    label | src       | expected
    ${"all lower case"} | ${"hello"} | ${"Hello"}
    ${"all upper case"} | ${"HELLO"} | ${"Hello"}
    ${"first letter capitalized"} | ${"Hello"} | ${"Hello"}
    ${"spaces"} | ${"Hello Mr Biggs"} | ${"Hello mr biggs"}
    ${"camelcase"} | ${"HelloMrBiggs"} | ${"Hellomrbiggs"}
    ${"non-alphanumeric characters"} | ${"On The 1st Day of 10/2/2001..."} | ${"On the 1st day of 10/2/2001..."}
    `('With $label',
        ({label, src, expected}) => {
        expect(ucFirst(src)).toBe(expected);
    });
});