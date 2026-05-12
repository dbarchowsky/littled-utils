import {beforeEach, describe, expect, test} from "@jest/globals";
import {settings} from "./fixtures/settings.js";
import {displayErrors} from "../src/index.js";

describe('showErrors', () => {

    /**
     * @param {string} id
     * @param {boolean} expect_visible
     * @param {string} msg
     */
    const confirmDom = (id, expect_visible, msg = '') => {
        const e = document.getElementById(id);
        if (expect_visible) {
            expect(e).not.toHaveClass(settings.css.hidden);
        } else {
            expect(e).toHaveClass(settings.css.hidden);
        }
        expect(e).toHaveTextContent(msg);
    };

    const local_errors = 'cart-error-16';
    const other_errors = 'other-errors';

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="alert alert-error hidden" id="${settings.selectors.errorContainerId}"></div>
            <div class="alert alert-error hidden" id="${other_errors}"></div>
            <div class="alert alert-error hidden" id="${local_errors}"></div>
        `;
    });

    test('using default container, an error message is displayed in the default container', () => {
        const msg = 'Test error message';

        displayErrors(msg);

        confirmDom(settings.selectors.errorContainerId, true, msg);
    });
    test('using default container, error message is not displayed in a container other than default', () => {
        displayErrors('Test error message');
        confirmDom(local_errors, false);
    });
    test('overriding the default container, error message is not displayed the default container', () => {
        displayErrors('Test error message', `#${local_errors}`);
        confirmDom(settings.selectors.errorContainerId, false);
    });
    test('overriding the default container, an error message is displayed in the specified container', () => {
        const msg = 'Test error message';

        displayErrors(msg, `#${local_errors}`);

        confirmDom(local_errors, true, msg);
    });
    test('overriding the default container, error message is not displayed in other error containers', () => {
        displayErrors('Test error message', `#${local_errors}`);
        confirmDom(other_errors, false);
    });
});