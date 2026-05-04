/**
 * Returns input value as a property of an object.
 * @param key
 * @return {{}}
 */
export function collectFormProperty (key) {
    const i = document.querySelector (`input[name="${key}"]`);
    return {[key]: i ? i.value : null};
}
