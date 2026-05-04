import {afterEach, beforeEach, describe, expect, jest, test} from "@jest/globals";
import {setEventHandler} from "../../src/index.js";

describe('setEventHandler', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div><button id="test-btn">click me</button></div>';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('Should set event handler', async () => {
        const btn = document.getElementById('test-btn');
        const clickSpy = jest.spyOn(btn, 'addEventListener');

        setEventHandler('#test-btn', 'click', () => {});
        btn.click();

        expect(clickSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('Should throw an error if element is not found', () => {
        expect(() => setEventHandler('#bogus-element', 'click', () => {}))
            .toThrow(/No element found matching "#bogus-element"/);

    })
});