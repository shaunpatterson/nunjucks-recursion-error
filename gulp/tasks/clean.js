import { sync as delSync } from 'del';
import gulp from 'gulp';

import { DIST } from '../config';

gulp.task('clean', done => {
    delSync([DIST]);
    done();
});
