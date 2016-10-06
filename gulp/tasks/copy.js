import { SRC, DIST } from '../config';
import gulp from 'gulp';

gulp.task('copy', done => {
    const src = `${SRC}/index.html`;
    return gulp.src(src).pipe(gulp.dest(DIST));
});
