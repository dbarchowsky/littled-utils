export function csrfUtils (settings = {}) {

    const config = {
        selectors: {
            csrfTokenId: 'csrf_token',
            errorContainer: '.alert-error',
            errorContainerId: 'error_container',
        },
        routes: {
            api: {
                csrfToken: '/api/csrf-token',
            }
        },
        ...settings,
    };

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
     * Set the value of the element holding a CSRF token.
     */
    async function fetchCSRFToken () {
        const response = await fetch (config.routes.api.csrfToken, {
            method: 'post'
        });

        if (!response.ok) {
            throw Error (`Error retrieving token. [${response.status}] ${response.statusText}`);
        }

        return response.headers.get ('X-CSRF-Token');
    }

    async function getCSRFTokenValue () {
        const element = document.querySelector(`meta[name="${config.selectors.csrfTokenId}"]`);
        let token = element?.getAttribute('content');
        if (token) {
            return token;
        }
        token = await fetchCSRFToken();
        if (!token) {
            throw Error('Token is not available.');
        }
        return token;
    }

    /**
     * Set the value of the element holding a CSRF token.
     */
    async function setCSRF () {
        let token = '';
        try {
            token = await fetchCSRFToken ();
        } catch (e) {
            throw Error (`Error setting token. ${e.message}`);
        }
        if (!token) {
            throw Error ('Token is not available.');
        }

        const element = document.querySelector (`meta[name="${config.selectors.csrfTokenId}"]`);
        if (element) {
            element.setAttribute('content', token);
        }
    }

    return {
        fetchCSRFToken,
        getCSRFHeaders,
        getCSRFTokenValue,
        setCSRF
    };
}
