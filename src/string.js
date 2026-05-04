/**
 * Convert a string to uppercase.
 * @param {string} str
 * @return {string}
 */
export function ucFirst (str) {
    return str.charAt (0).toUpperCase () + str.slice (1).toLowerCase ();
}
