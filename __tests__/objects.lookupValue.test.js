import {describe, expect, it} from "@jest/globals";
import {lookupValue} from "../src/index.js";
import {lookupValueTestData as testData} from "./fixtures/dataProvider/objects.lookupValue.tdp.js";

describe('objects.lookupValue', () => {
    it.each(testData())('$label', (
        testData
    ) => {
        expect(lookupValue(testData.needle, testData.haystack)).toEqual(testData.expected);
    });
});