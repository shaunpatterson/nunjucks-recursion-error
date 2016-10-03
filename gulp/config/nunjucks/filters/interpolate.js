/**
 * Take a string with placeholders (%1, %2, etc.) and replace each placeholder
 * with the corresponding value in a list of parameters.
 * @param  {String}  text   String to operate upon
 * @param  {Array}   params List of values to be used for each text placeholder
 * @return {Boolean}        The original string with interpolated values
 */
export function interpolate(text, params) {
    if (!params) {
        return text;
    }

    if (!Array.isArray(params)) {
        params = [params];
    }

    return params.reduce(
        (val, param, idx) => val.replace(`%${idx + 1}`, param), text);
}
