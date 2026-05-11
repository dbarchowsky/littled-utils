import {describe, expect, test} from "@jest/globals";
import {formatCookieExpiration} from "../src/index.js";
import {formatCookieExpirationTestData as testData} from "./fixtures/dataProvider/cookies.formatCookieExpiration.tdp.js";

describe('formatCookieExpiration', () => {
    test.each(testData())('$label', (
        data
    ) => {
        const utcRegex = /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
        expect(formatCookieExpiration(data.hours)).toMatch(utcRegex);
    });
});