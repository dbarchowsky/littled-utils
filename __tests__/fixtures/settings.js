import {csrfOptions} from "../../src/index.js";

export const settings = {
    css: {
        hidden: 'hidden',
    },
    selectors: {
        csrfTokenId: csrfOptions.selectors.csrfTokenId,
        errorContainer: '.alert-error',
        errorContainerId: 'error_container',
    }
};