import { sync as globSync } from 'glob';
import ngAnnotatePlugin from 'ng-annotate-webpack-plugin';
import { join } from 'path';
import {
    __,
    compose,
    concat,
    curryN,
    flip,
    last,
    map,
    merge,
    mergeAll,
    mergeWith,
    of,
    pick,
    reduce,
    split,
    zipObj
} from 'ramda';
import webpack from 'webpack';

import {
    DIST,
    SRC,
    TEMPLATES
} from '../config';

/**
 * Map the entry point(s) for a given bundle.
 * This allows for targeted bundles on a per feature basis.
 * @param  {Object} bundle  Target bundle
 * @return {Object}         Entry mappings for the target bundle
 */
const getEntryMappings = map(map(
    curryN(3, join)(SRC, __, 'js/index.js')
));

/**
 * Create an object has with the filename key (global alias)
 * mapped to a given file path value.
 * @param  {String} globStr Glob String
 * @return {Object}         Hash of global aliases
 */
const resolveTemplateAliases = globStr => {
    const getTemplateName = compose(
        last,
        split('templates/')
    );
    const globals = globSync(globStr);

    return zipObj(
        map(getTemplateName, globals),
        globals
    );
};

const baseOptions = () => {
    return {
        context:SRC,
        output: {
            path: join(DIST, 'js'),
            filename: '[name].js'
            // sourceMapFilename: '[file].map',
            // library: '[name]',
            // libraryTarget: 'var'
        }
    };
};

const devOptions = () => {
    return {
        debug: true,
        devtool: 'eval-source-map'
    };
};

const entryOptions = () => {
    return {
        entry: getEntryMappings(SRC)
    };
};

const externalsOptions = () => {
    return {
        externals: [
            {
                urbnTokenLib: true
            }
        ]
    };
};

// todo remove all loaders but babel going forward
const loadersOptions = () => {
    return {
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(.idea|brandweb|bower_components|dist|keyrings|node_modules|urbnweb|venv)/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: '.babel'
                    }
                },
                {
                    test: /\.j2$/,
                    exclude: /(.idea|brandweb|bower_components|dist|gulp|keyrings|node_modules|urbnweb|venv)/,
                    loader: 'nunjucks-loader',
                    query: {
                        jinjaCompat: true,
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
    };
};


const resolveOptions = () => {
    return {
        resolve: {
            root: TEMPLATES,
            alias: resolveTemplateAliases(join(TEMPLATES,'**/*.j2'))
        }
    };
};

const watchOptions = () => {
    return {
        watch: true
    };
};

/**
 * Base webpack config
 * @type {Object}
 */
export const webpackBaseConfig = () => mergeAll([
    baseOptions(),
    entryOptions(),
    externalsOptions(),
    loadersOptions(),
    resolveOptions()
]);

/**
 * Webpack dev config
 * @type {Object}
 */
export const webpackDevConfig = () => mergeWith(
    concat,
    webpackBaseConfig(),
    devOptions()
);
