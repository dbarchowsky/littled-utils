import {beforeEach, describe, expect, it} from "@jest/globals";
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

    it('Should display an error message is displayed in the default container', () => {
        const msg = 'Test error message';

        displayErrors(msg);

        confirmDom(settings.selectors.errorContainerId, true, msg);
    });

    it('Should not display error messages in containers other than the default', () => {
        displayErrors('Test error message');
        confirmDom(local_errors, false);
    });

    it('Should not display error message in default container when overridden', () => {
        displayErrors('Test error message', {selector: `#${local_errors}`});
        confirmDom(settings.selectors.errorContainerId, false);
    });

    it('Should display error message in specified container', () => {
        const msg = 'Test error message';

        displayErrors(msg, {selector: `#${local_errors}`});

        confirmDom(local_errors, true, msg);
    });

    it('Should not update other potential error container content when specifying the container', () => {
        displayErrors('Test error message', {selector: `#${local_errors}`});
        confirmDom(other_errors, false);
    });

    it('Should display an error message within a specified parent element', () => {
        document.body.innerHTML = `
        <div id="e1" class="alert alert-error hidden">Default container</div>
        <div id="target-container">
            <div id="e2" class="alert alert-error hidden">Embedded container.</div>
        </div>
        <div id="e3" class="alert alert-error hidden">Secondary container</div>
        `;
        const element = document.getElementById('target-container');
        displayErrors('Test error message', {parent: element});

        expect(document.getElementById('e1').textContent).toBe('Default container');
        expect(document.getElementById('e2').textContent).toBe('Test error message');
        expect(document.getElementById('e3').textContent).toBe('Secondary container');
    })
});