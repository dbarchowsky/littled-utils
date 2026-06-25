import {afterEach, describe, expect, it, jest, test} from "@jest/globals";
import {cookieUtils} from "../src/index.js";
import {mockFetchJson} from "./fixtures/mockFetch.js";
import {settings} from "./fixtures/settings.js";

describe('SiteUtils.checkForCookieConsent', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test.each`
    status                      | expected
    ${"granted"}    | ${true}
    ${"declined"}    | ${false}
    ${"unknown"}     | ${false}
    ${"unavailable"} | ${false}
    ${"accepted"}    | ${false}
    ${"approved"}    | ${false}
    ${"success"}     | ${false}
    `('Should return $expected when with status of "$status"',async ({status, expected}) => {
        mockFetchJson({status: status});
        const utils = cookieUtils(settings);
        await expect(utils.checkForCookieConsent()).resolves.toBe(expected);
    });

    it('Should throw error on HTTP error', async () => {
       mockFetchJson({error: "Some error"}, false, 500);
       const utils = cookieUtils(settings);
       await expect(utils.checkForCookieConsent())
           .rejects.toThrow('HTTP 500 error: "Some error"');
    });

    it('Should use runtime settings to override the consent api endpoint', async() => {
        mockFetchJson({status: "success"});
        const runtimeRoute = "/runtime/consent/route";
        const runtimeOptions = {
            routes: {
                api: {
                    consentStatus: runtimeRoute,
                },
            },
        };
        const utils = cookieUtils(runtimeOptions);

        expect(utils.cuConfig.routes.api.consentStatus).toBe(runtimeRoute);

        await utils.checkForCookieConsent();
        expect(global.fetch).toHaveBeenCalledWith(runtimeRoute);
    });
});