export function createLittledUtils (settings = {}) {

    const config = {
        selectors: {
            csrfTokenId: 'csrf_token',
            errorContainer: '.alert-error',
            errorContainerId: 'error_container',
        },
        css: {
            hidden: 'hidden'
        },
        routes: {
            api: {
                csrfToken: '/api/csrf_token',
                consentStatus: '/api/consent/status',
                consentAccept: '/api/consent/accept',
            }
        },
        ...settings,
    };

    /**
     * Checks if the user has approved consent via the API.
     * @returns {Promise<boolean>} True if status is 'approved', false otherwise.
     */
    async function checkForCookieConsent () {
        const response = await fetch (config.routes.api.consentStatus);

        if (!response.ok) {
            const json = await response.json ();
            throw new Error (`HTTP ${response.status} error: "${json.error}"`);
        }

        const json = await response.json ();
        return json.status === 'accepted';
    }

    /**
     * Get the headers required for CSRF protection.
     * @return {Headers}
     */
    function getCSRFHeaders (csrfTokenId = config.selectors.csrfTokenId) {
        const token = document.querySelector (`meta[name="${csrfTokenId}"]`)?.getAttribute ('content') ?? '';
        return (new Headers ({
            'X-CSRF-Token': token,
        }));
    }

    /**
     * Hide the error container.
     * @param {string} selector
     */
    function hideErrors (selector = config.selectors.errorContainer) {
        document.querySelectorAll (selector).forEach (e => e.classList.add (config.css.hidden))
    }

    /**
     * Set the value of the element holding a CSRF token.
     */
    async function setCSRF () {
        await fetch (config.routes.api.csrfToken, {
            method: 'post'
        })
            .then (response => {
                if (!response.ok) {
                    throw Error ('Error setting token.');
                }
                let data = response.json;
                data['token'] = response.headers.get ('X-CSRF-Token');
                return response.json;
            })
            .then (response => {
                document.querySelector (`meta[name="${config.selectors.csrfTokenId}"]`).value = response.token;
            });
    }

    /**
     * Display an error message in the element dedicated to error messages.
     * @param {string} message
     * @param {string} selector
     */
    function showErrors (message, selector = `#${config.selectors.errorContainerId}`) {
        const e = document.querySelector (selector);
        if (e) {
            e.innerHTML = message;
            e.classList.remove (settings.css.hidden);
        }
    }
    return {
        checkForCookieConsent,
        getApiHeaders,
        getCSRFHeaders,
        hideErrors,
        setCSRF,
        showErrors,
    };
}

/**
 * Returns input value as a property of an object.
 * @param key
 * @return {{}}
 */
export function collectFormProperty (key) {
    const i = document.querySelector (`input[name="${key}"]`);
    return {[key]: i ? i.value : null};
}

/**
 * Convert a number of hours to an expiration date string.
 * @param {number} hours
 * @return {string}
 */
export function formatCookieExpiration (hours) {
    const date = new Date ();
    date.setTime (date.getTime () + (hours * 60 * 60 * 1000));
    return date.toUTCString ();
}

/**
 * Get the headers required for API requests.
 * @return {Headers}
 */
export function getApiHeaders () {
    const headers = createLittledUtils().getCSRFHeaders();
    headers.append ('Content-Type', 'application/json');
    headers.append ('Accept', 'application/json');
    return headers;
}

/**
 * Handler to attach to an email link in place of embedding the email address in the document source.
 * @param {string} u Email account name
 * @param {string} d Email domain name
 * @param {string} tld Email top level domain
 * @param {string} s Email subject
 */
export function mailIt (u, d, tld, s) {
    const href = 'mailto:' + u + '@' + d + '.' + tld + ((s !== undefined) ? ('?subject=' + s) : (''));
    const win = window.open (href, 'mail');
    const checkClose = function () {
        console.log ('checkClose');
        win.location.href;
        return win.close ();
    };
    let t = setTimeout (checkClose, 5000);
    const checkLoaded = function () {
        console.log ('loaded');
        clearTimeout (t);
        return t = setTimeout (checkClose, 2000);
    };
    win.onload = checkLoaded;
    const loadEvents = ["DomContentLoaded", "load", "beforeunload", "unload"];
    for (let i = 0, len = loadEvents.length; i < len; i++) {
        const evt = loadEvents[i];
        win.addEventListener (evt, checkLoaded);
    }
}

/**
 * Make an API request to the server.
 * @param {string} url
 * @param {{}} data
 * @return {Promise<any>}
 */
export async function makeApiRequest (url, data = {}) {
    const response = await makeApiRequestRaw (url, data);

    if (!response.ok) {
        throw new Error (`"The request could not be completed. Status: (${response.status}) ${response.statusText}`);
    }

    return await response.json ();
}

/**
 * Make an API request to the server.
 * @param {string} url
 * @param {{}} data
 * @return {Promise<any>}
 */
export async function makeApiRequestRaw (url, data = {}) {
    return fetch (url, {
        method: 'post',
        body: JSON.stringify (data),
        headers: getApiHeaders (),
    });
}

export const navigateTo = (url) => window.location.replace (url);

/**
 * Set the location of the browser window.
 * @param {string} url
 */
export function redirectTo (url) {
    window.location.replace (url);
}

/**
 * Set an event handler for a specific element.
 * @param {string} selector
 * @param {string} event_name
 * @param {function} fn
 */
export function setEventHandler (selector, event_name, fn) {
    const elt = document.querySelectorAll (selector);
    if (elt.length === 0) {
        throw new Error (`No element found matching "${selector}"`);
    }
    elt.forEach (e => {
        e.addEventListener (event_name, fn);
    });
}

/**
 * Convert a string to uppercase.
 * @param {string} str
 * @return {string}
 */
export function ucFirst (str) {
    return str.charAt (0).toUpperCase () + str.slice (1).toLowerCase ();
}
