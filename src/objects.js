/**
 * Deep merge two or more objects.
 * @param {Object} target The destination object.
 * @param {...Object} sources The source objects to merge.
 * @returns {Object} The merged target.
 */
export function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (source instanceof Object) {
        for (const key in source) {
            if (source[key] instanceof Object && !Array.isArray(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return deepMerge(target, ...sources);
}

/**
 * Look up a value in an associative array, e.g. form data to be sent along with a request
 * @param needle {int|string|int[]|string[]}
 * @param haystack {array}
 * @returns {*|undefined}
 */
export function lookupValue(needle, haystack) {
    if (Array.isArray(needle)) {
        for (const key of needle) {
            if (key in haystack) {
                return haystack[key];
            }
        }
    }
    else {
        if (haystack.hasOwnProperty(needle)) {
            return haystack[needle];
        }
    }
    return undefined;
}


