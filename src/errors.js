const config = {
    css: {
        hidden: 'hidden',
    },
    selectors: {
        errorContainer: '.alert-error',
        errorContainerId: 'error_container',
    },
};

/**
 * Hide the error container.
 * @param {string} selector
 */
export function dismissErrors (selector = config.selectors.errorContainer) {
    document.querySelectorAll (selector).forEach (e => e.classList.add (config.css.hidden))
}

/**
 * Display an error message in the element dedicated to error messages.
 * @param {String} message
 * @param {Object} target
 * @param {String|undefined} target.selector
 * @param {Element|undefined} target.parent
 * @return {void}
 */
export function displayErrors (message, target = {}) {
    target = {
        selector: target.selector ?? config.selectors.errorContainer,
        parent: target.parent ?? document.body
    };
    const e = target.parent.querySelector (target.selector);
    if (e) {
        e.textContent = message;
        e.classList.remove (config.css.hidden);
    }
}
