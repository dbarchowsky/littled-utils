/**
 * Add a meta tag to the document.
 * @param {string} name
 * @param {string} content
 */
export function addMetaTag(name, content) {
    const meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    document.head.appendChild(meta);
}