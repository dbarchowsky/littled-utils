import {describe, expect, test} from "@jest/globals";
import {cookieUtils} from "../src/index.js";

describe('cookieUtils', () => {
    test('Should merge settings', async () => {
        const localSettings = {
            routes: {
                api: {
                    customRoute: '/api/custom',
                },
                otherRoute: '/foo',
            },
            foo: 'bar',
        };
        const baseUtils = cookieUtils();
        const expected = {
            ...baseUtils.config,
            routes: {
                ...(baseUtils.config.routes || {}),
                api: {
                    ...(baseUtils.config.routes?.api || {}),
                    customRoute: '/api/custom',
                },
                otherRoute: '/foo',
            },
            foo: 'bar',
        };

        const utils = cookieUtils(localSettings);
        expect(utils.config).toEqual(expected);
    });
});