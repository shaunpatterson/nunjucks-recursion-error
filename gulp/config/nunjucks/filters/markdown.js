import md from 'marked';
import queryString from 'query-string';

const customRenderers = {
    'productDetail': function(options={}) {
        const renderer = new md.Renderer();
        const superFunc = renderer.image;

        if (!options['image_width']) {
            options['image_width'] = 640;
        }

        renderer.image = (href, title, text) => {
            const queryStringIndex = href.indexOf("?");

            if (queryStringIndex > -1) {
                const queryStringObj = queryString.parse(href.substring(queryStringIndex));

                queryStringObj['wid'] = String(options['image_width']);

                const newHref = `${href.substring(0, queryStringIndex)}?${queryString.stringify(queryStringObj)}`;
                return superFunc.bind(renderer)(newHref, title, text);
            } else {
                const queryStringObj = {
                    wid: String(options['image_width'])
                };
                const newHref = `${href}?${queryString.stringify(queryStringObj)}`;
                return superFunc.bind(renderer)(newHref, title, text);
            }
        };

        return renderer;
    }
};

/**
 * Produces HTML from Markdown, using the markdown-js parser
 * @param {string} value  - The markdown string
 * @param {string} rendererType - An optional renderer type string (see urbnweb/features/core/utils/filters.py)
 * @returns {string} result - The markup string
 */
export function markdownFilter(value='', rendererType) {
    try {
        let result;

        if (rendererType && customRenderers[rendererType]) {
            const renderer = customRenderers[rendererType]();
            result = md(value, { renderer: renderer });
        } else {
            result = md(value);
        }

        return this.env.filters.safe(result);
    } catch (e) {
        console.error(e);
        return value;
    }
}

/**
 * Produces HTML from Markdown, using the markdown-js parser,
 * removing the wrapping <p> tags from inline content
 * @param {string} value  - The markdown string
 * @param {string} rendererType - An optional renderer type string (see urbnweb/features/core/utils/filters.py)
 * @returns {string} result - The markup string
 */
export function markdownNoWrapFilter(value='', rendererType) {
    try {
        let result;

        if (rendererType && customRenderers[rendererType]) {
            const renderer = customRenderers[rendererType]();
            result = md(value, { renderer: renderer });
        } else {
            result = md(value);
        }

        result = result.replace(/^<p>|<\/p>$/g, '');

        return this.env.filters.safe(result);
    }
    catch (e) {
        console.error(e);
        return value;
    }
}
