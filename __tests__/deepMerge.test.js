import {describe, expect, test} from "@jest/globals";
import {deepMerge} from "../src/index.js";
import {deepMergeTestData} from "./dataProvider/deepMerge.tdp.js";

describe('deepMerge', () => {

    test.each(deepMergeTestData())('$label', (
        data
    ) => {
        deepMerge(data.target, ...data.sources);
        expect(data.target).toEqual(data.expected);
    });
});