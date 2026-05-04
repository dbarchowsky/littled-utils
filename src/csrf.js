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

    return {
        getCSRFHeaders,
        setCSRF
    };
}
