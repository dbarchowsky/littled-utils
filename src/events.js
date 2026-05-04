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
