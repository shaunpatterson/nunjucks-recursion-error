import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['build:dev']);

gulp.task('build:dev', done => runSequence(
    'clean',
    'webpack',
    done
));

