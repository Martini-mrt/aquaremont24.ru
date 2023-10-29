const gulp = require('gulp');

// convert fonts
// fonts ttf in woff2
const ttf2woff2 = require('gulp-ttf2woff2');

// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');

gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task(
	'docs',
	gulp.series(
		'clean:docs',
		gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
		gulp.parallel('server:docs')
	)
);


gulp.task('convert-fonts', function (done) {
		gulp.src('./src/fonts/src/*.ttf')
		// это если нужно woff
		// .pipe(fonter({
		// 	formats: ['woff', 'ttf']
		// }))
		// .pipe(src('./src/fonts/*.ttf'))
		.pipe(ttf2woff2())
		.pipe(gulp.dest('./src/fonts/'))
		done();
});



