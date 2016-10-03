/**
 * Removes double slashes (//) from url (but not the one after the protocol)
 * @param {string} url - url to filter
 * @returns {string} - The sanitized url
 */
export function sanitizeURLFilter(url) {
    let result = url.trim();
    const beginsWithProtocol = /^(.*:\/\/)(.*)$/;
    const matches = beginsWithProtocol.exec(result);

    if (matches) {
        result = `${matches[1]}${matches[2].replace('//', '/')}`;
    } else {
        result = result.replace('//', '/');
    }

    return result;
}

export default sanitizeURLFilter;
