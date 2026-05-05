/**
 * Handler to attach to an email link in place of embedding the email address in the document source.
 * @param {string} u Email account name
 * @param {string} d Email domain name
 * @param {string} tld Email top level domain
 * @param {string} s Email subject
 */
export function mailIt (u, d, tld, s= '') {
    let href = `mailto:${u}@${d}.${tld}`;
    if (s) {
        href += `?subject=${encodeURIComponent(s)}`;
    }
    mailIt._navigate(href);
}

/**
 * Helper function to allow for simpler unit testing.
 * @param {string} href
 * @private
 */
mailIt._navigate = (href) => window.location.replace(href);
