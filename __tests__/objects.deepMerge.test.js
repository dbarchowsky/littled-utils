import {describe, expect, test} from "@jest/globals";
import {deepMerge} from "../src/index.js";
import {deepMergeTestData} from "./dataProvider/objects.deepMerge.tdp.js";

describe('deepMerge', () => {

    test.each(deepMergeTestData())('$label', (
        data
    ) => {
        const result = deepMerge(data.target, ...data.sources);
        expect(result).toEqual(data.expected);
        expect(data.target).toEqual(data.expected);
    });

    test("Should alter target. Should not alter the source objects. Should return a copy.", () => {
       const target = {a: 1, b: 2};
       const source1 = {b: 3, c: 4};
       const source2 = {d: 5};

       const result = deepMerge(target, source1, source2);
       expect(result).toEqual({a: 1, b: 3, c: 4, d: 5});
       expect(target).toEqual({a: 1, b: 3, c: 4, d: 5});
       expect(source1).toEqual({b: 3, c: 4});
       expect(source2).toEqual({d: 5});
    });
});