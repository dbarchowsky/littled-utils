/**
 * Returns all data attributes attached to a DOM element.
 * @param {String|Element} element
 */
export function collectElementData(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) {
        return {};
    }
    return /** @typedef Element */ element.dataset ? {...element.dataset } : {};
}