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
 * @param {string} message
 * @param {string} selector
 */
export function displayErrors (message, selector = `#${config.selectors.errorContainerId}`) {
    const e = document.querySelector (selector);
    if (e) {
        e.textContent = message;
        e.classList.remove (config.css.hidden);
    }
}
