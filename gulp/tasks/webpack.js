import gulp from 'gulp';
import mergeStreams from 'merge-stream';
import touch from 'touch';
import { join } from 'path';
import {
    __,
    compose,
    curryN,
    flatten,
    flip,
    map,
    partialRight,
    propOr,
    split
} from 'ramda';
// import webpack from 'webpack';
import webpack from 'webpack-stream';
import { argv } from 'yargs';

import {
    SRC,
    BRAND_DIST,
    COMMON_BUNDLE_FILENAME,
    TEMP_FEATURES
} from '../config';

import {
    ENABLED_FEATURES,
    FEATURE_BUNDLES,
    getWebpackBundleWatchConfig,
    webpackDevConfig,
    webpackProdConfig,
    webpackStagingConfig,
    webpackWatchConfig
} from '../utils/create-webpack-config';

const featureEntryPoint = `../../src/index.js`;

function getWebpackStream(config, src) {
    console.log('this is src');
    console.log(src);
    return gulp.src(src)
        .pipe(webpackStream(config, webpack))
        .pipe(gulp.dest(join(DIST, 'js')));
}

// gulp.task('webpack', done => {
//     return getWebpackStream(webpackDevConfig(), featureEntryPoint);
// });

gulp.task('webpack', done => {
    return gulp.src('src/index.js')
        .pipe(webpack({
            watch: true,
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
                            //jinjaCompat: true,
                        }
                    },
                    {
                        test: /\.json$/,
                        loader: 'json-loader'
                    }
                ]
            },
            output: {filename: 'app.js'} 
        }))
        .pipe(gulp.dest('dist/'));
})
