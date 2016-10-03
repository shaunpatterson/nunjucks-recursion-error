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
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
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

const getFeatureEntryPoint = curryN(3, join)(SRC, __, 'js/index.js');

function getWebpackStream(config, src) {
    console.log(config);
    console.log(src);
    return gulp.src(src)
        .pipe(webpackStream(config, webpack))
        .pipe(gulp.dest(join(DIST, 'js')));
}

gulp.task('webpack', done => {
    return getWebpackStream(webpackDevConfig(), getFeatureEntryPoint());
});
