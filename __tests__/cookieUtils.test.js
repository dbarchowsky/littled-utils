import {describe, expect, test} from "@jest/globals";
import {cookieUtils} from "../src/index.js";
import {configTestData} from "./fixtures/dataProvider/cookieUtils.tdp.js";

describe('cookieUtils', () => {
    test.each(configTestData)('$testLabel', (
        data
    ) => {
        const baseUtils = cookieUtils();
        const expected = {
            ...baseUtils.cuConfig,
            ...(data?.runtimeOptions || {}),
            routes: {
                ...(baseUtils.cuConfig.routes || {}),
                ...(data.runtimeOptions?.routes || {}),
                api: {
                    ...(baseUtils.cuConfig.routes?.api || {}),
                    ...(data.runtimeOptions?.routes?.api || {}),
                },
            },
        };

        const utils = cookieUtils(data.runtimeOptions || {});
        expect(utils.cuConfig).toEqual(expected);
    });
});