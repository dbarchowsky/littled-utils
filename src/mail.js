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
