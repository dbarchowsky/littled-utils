import {afterEach, describe, it, expect} from "@jest/globals";
import { collectElementData } from '../src/requests';

describe('requests.collectElementData', () => {

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it ("should return the element's dataset", () => {
        document.body.innerHTML = '<div id="test-element" data-foo="bar" data-biz="bash" data-record-id="123" data-blank="">Test element</div>';

        const element = document.getElementById('test-element');
        const result = collectElementData(element);
        expect(result).toEqual({foo: 'bar', biz: 'bash', recordId: '123', blank: ''});
    });

    it ("should return the dataset matching the selector", () => {
        document.body.innerHTML = '<div id="test-element" data-foo="bar" data-biz="bash" data-record-id="123" data-blank="">Test element</div>';

        const result = collectElementData('#test-element');
        expect(result).toEqual({foo: 'bar', biz: 'bash', recordId: '123', blank: ''});
    });

    it ("should return an empty object if the element is not found", () => {
        document.body.innerHTML = '<div id="test-element">Test element</div>';
        const result = collectElementData('#non-existent-element');
        expect(result).toEqual({});
    })
});