import gulp from 'gulp';
import runSequence from 'run-sequence';

export const defaultTask = gulp.task('default', done => runSequence(
    'development',
    'watch',
    done
));
