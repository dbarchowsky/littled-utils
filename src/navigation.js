export const navigateTo = (url) => window.location.replace (url);

/**
 * Set the location of the browser window.
 * @param {String} url
 */
export function redirectTo (url) {
    redirectTo._navigate (url);
}

/**
 * Helper function to allow for simpler unit testing.
 * @param {String} url
 * @private
 */
redirectTo._navigate = (url) => window.location.replace (url);