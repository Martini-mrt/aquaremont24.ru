const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');

// Server
const browserSync = require('browser-sync').create();
// const server = require('gulp-server-livereload');


const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const changed = require('gulp-changed');

gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:dev', function () {
	return (
		gulp
			.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
			.pipe(changed('./build/', { hasChanged: changed.compareContents }))
			.pipe(plumber(plumberNotify('HTML')))
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(gulp.dest('./build/'))
			.pipe(browserSync.stream())
	
	);
});

gulp.task('sass:dev', function () {
	return (
		gulp
			.src('./src/scss/*.scss')
			.pipe(changed('./build/css/'))
			.pipe(plumber(plumberNotify('SCSS')))
			.pipe(sourceMaps.init())
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(sourceMaps.write())
			.pipe(gulp.dest('./build/css/'))
			.pipe(browserSync.stream())
	);
});

gulp.task('images:dev', function () {
	return gulp
	.src('./src/img/**/*')
	.pipe(changed('./docs/img/'))
	.pipe(webp())
	.pipe(gulp.dest('./docs/img/'))
	.pipe(gulp.src('./src/img/**/*'))
	.pipe(changed('./docs/img/'))
	.pipe(imagemin({ verbose: true }))
	.pipe(gulp.dest('./docs/img/'))
	.pipe(browserSync.stream())
});

gulp.task('fonts:dev', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./build/fonts/'))
		.pipe(gulp.dest('./build/fonts/'))
		.pipe(browserSync.stream())
});

gulp.task('files:dev', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'))
		.pipe(browserSync.stream())
});

gulp.task('js:dev', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		// .pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./build/js/'))
		.pipe(browserSync.stream())

});

// const serverOptions = {
// 	livereload: true,
// 	open: true,
// };

// gulp.task('server:dev', function () {
// 	return gulp.src('./build/').pipe(browserSync.stream());
// 	// return gulp.src('./build/').pipe(server(serverOptions));
// });



// browserSync server
gulp.task('server:dev', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});






gulp.task('watch:dev', function () {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'));
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});
