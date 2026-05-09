import {afterEach, describe, expect, jest, test} from "@jest/globals";
import {cookieUtils} from "../src/index.js";
import {mockFetchJson} from "./fixtures/mockFetch.js";
import {settings} from "./fixtures/settings.js";

describe('SiteUtils.checkForCookieConsent', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test.each`
    status                      | expected
    ${"accepted"}    | ${true}
    ${"declined"}    | ${false}
    ${"unknown"}     | ${false}
    ${"unavailable"} | ${false}
    ${"approved"}    | ${false}
    ${"success"}     | ${false}
    `('Should return $expected when with status of "$status"',async ({status, expected}) => {
        mockFetchJson({status: status});
        const utils = cookieUtils(settings);
        await expect(utils.checkForCookieConsent()).resolves.toBe(expected);
    });

    test('Should throw error on HTTP error', async () => {
       mockFetchJson({error: "Some error"}, false, 500);
       const utils = cookieUtils(settings);
       await expect(utils.checkForCookieConsent())
           .rejects.toThrow('HTTP 500 error: "Some error"');
    });
});