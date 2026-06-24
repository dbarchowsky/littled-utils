export function cookieUtils (settings = {}) {

    const cuConfig = {
        ...settings,
        routes: {
            ...(settings?.routes || {}),
            api: {
                csrfToken: '/api/csrf_token',
                consentStatus: '/api/cookie-consent/status',
                consentAccept: '/api/cookie-consent/accept',
                ...(settings.routes?.api || {}),
            }
        },
    };

    /**
     * Checks if the user has approved consent via the API.
     * @returns {Promise<boolean>} True if status is 'approved', false otherwise.
     */
    async function checkForCookieConsent () {
        const response = await fetch (cuConfig.routes.api.consentStatus);

        if (!response.ok) {
            const json = await response.json ();
            throw new Error (`HTTP ${response.status} error: "${json.error}"`);
        }

        const json = await response.json ();
        return json.status === 'accepted';
    }

    return {
        cuConfig, checkForCookieConsent
    };
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
