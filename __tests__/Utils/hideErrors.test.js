import {afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import {settings} from "../fixtures/settings.js";
import {createLittledUtils} from "../../src/littled-utils.js";

describe('hideErrors', () => {

    /**
     * @param {string} id
     * @param {boolean} expect_visible
     */
    const confirmDom = (id, expect_visible) => {
        const e = document.getElementById(id);
        if (expect_visible) {
            expect(e).not.toHaveClass(settings.css.hidden);
        } else {
            expect(e).toHaveClass(settings.css.hidden);
        }
    };

    const local_errors = 'cart-error-16';
    const other_errors = 'other-errors';

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="alert alert-error" id="${settings.selectors.errorContainerId}"></div>
            <div class="alert alert-error" id="${other_errors}"></div>
            <div class="alert alert-error" id="${local_errors}"></div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('using default container, all error elements are hidden', () => {
        const utils = createLittledUtils(settings);
        utils.hideErrors();
        confirmDom(settings.selectors.errorContainerId, false);
        confirmDom(other_errors, false);
        confirmDom(local_errors, false);
    });
    test('overriding the default container, error message is not displayed the default container', () => {
        const utils = createLittledUtils(settings);
        utils.hideErrors(`#${local_errors}`);
        confirmDom(settings.selectors.errorContainerId, true);
    });
    test('overriding the default container, an error message is displayed in the specified container', () => {
        const utils = createLittledUtils(settings);
        utils.hideErrors(`#${local_errors}`);

        confirmDom(local_errors, false);
    });
    test('overriding the default container, error message is not displayed in other error containers', () => {
        const utils = createLittledUtils(settings);
        utils.hideErrors(`#${local_errors}`);
        confirmDom(other_errors, true);
    });
});