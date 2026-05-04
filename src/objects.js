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
