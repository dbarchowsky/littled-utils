import {describe, expect, test} from "@jest/globals";
import {cookieUtils} from "../src/index.js";
import {configTestData} from "./fixtures/dataProvider/cookieUtils.tdp.js";

describe('cookieUtils', () => {
    test.each(configTestData)('$testLabel', (
        data
    ) => {
        const baseUtils = cookieUtils();
        const expected = {
            ...baseUtils.config,
            ...(data?.runtimeOptions || {}),
            routes: {
                ...(baseUtils.config.routes || {}),
                ...(data.runtimeOptions?.routes || {}),
                api: {
                    ...(baseUtils.config.routes?.api || {}),
                    ...(data.runtimeOptions?.routes?.api || {}),
                },
            },
        };

        const utils = cookieUtils(data.runtimeOptions || {});
        expect(utils.config).toEqual(expected);
    });
});