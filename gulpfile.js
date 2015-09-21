(function () {
	'use strict';

	/* Requires */
	var autoprefixer				= require('gulp-autoprefixer'),
	var compass						= require('gulp-compass'),
	var connect						= require('gulp-connect'),
	var gulp 						= require('gulp'),
	var gulpif 						= require('gulp-if'),
	var historyApiFallback 			= require('connect-history-api-fallback'),
	var inject 						= require('gulp-inject'),
	var jshint 						= require('gulp-jshint'),
	var minifyCss 					= require('gulp-minify-css'),
	var notify 						= require('gulp-notify'),
	var path 						= require('path'),
	var plumber						= require('gulp-plumber'),
	var sass 						= require('gulp-sass'),
	var stylish						= require('jshint-stylish'),
	var templateCache 				= require('gulp-templatecache'),
	var uglify 						= require('gulp-uglify'),
	var uncss 						= require('gulp-uncss'),
	var useref 						= require('gulp-useref'),
	var wiredep 					= require('wiredep');
	
	/* CONSTANTS */
	var APP_PATH					= 'app',
	APP_HTML_FILES  		        = path.join(APP_PATH, '**', '*.html'),
	APP_JS_FILES	        	    = path.join(APP_PATH, '**', '*.js'),
	ASSETS_PATH						= 'assets',
	ASSETS_IMG_PATH           		= path.join(ASSETS_PATH, 'img'),
	ASSETS_IMG_JPG_FILES      		= path.join(ASSETS_IMG_PATH, 'img', '*.jpg'),
	ASSETS_IMG_PNG_FILES      		= path.join(ASSETS_IMG_PATH, 'img', '*.png'),
  	ASSETS_STYLES_PATH 				= path.join(ASSETS_PATH, 'stylesheets'),
	ASSETS_STYLES_SASS_PATH   		= path.join(ASSETS_STYLES_PATH, 'sass'),
	ASSETS_STYLES_CSS_FILES   		= path.join(ASSETS_STYLES_CSS_PATH, '**', '*.css'),
	ASSETS_STYLES_SASS_FILES  		= path.join(ASSETS_STYLES_SASS_PATH, '**', '*.scss'),
	ASSETS_STYLES_SASS_ENTRY  		= path.join(ASSETS_STYLES_SASS_PATH, 'app.scss');

	 /* errorHandler */
	var notifyInfo = {
		title: 'Gulp',
		icon: path.join(__dirname, 'gulp.png')
	};

	var plumberErrorHandler = { 
		errorHandler: notify.onError({
			title: notifyInfo.title,
			icon: notifyInfo.icon,
			message: "Error: <%= error.message %>"
		});
	};

	gulp.task('server', function() {
		connect.server({
			root: [__dirname],
			hostname: '0.0.0.0',
			port: 8080,
			livereload: true,
			middleware: function(connect, opt) {
				return [ historyApiFallback ];
			}
		});
	});

	gulp.task('html', function() {
		gulp.src(APP_HTML_FILES)
		.pipe(plumber(plumberErrorHandler))
		.pipe(connect.reload());
	});

	gulp.task('sass', function () {
		gulp.src(ASSETS_STYLES_SASS_ENTRY)
	  	.pipe(plumber(plumberErrorHandler))
	  	.pipe(sass())
	  	.pipe(gulp.dest(ASSETS_STYLES_CSS_PATH));
	});

	gulp.task('compass', function() {
		gulp.src(ASSETS_STYLES_SASS_ENTRY)
		.pipe(plumber(plumberErrorHandler))
		.pipe(compass({
	  		css: ASSETS_STYLES_CSS_PATH,
		  	sass: ASSETS_STYLES_SASS_PATH,
		  	image: ASSETS_IMG_PATH,
		  	style: 'expanded',
		  	comments: true,
		  	time:true
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(ASSETS_STYLES_CSS_PATH))
		.pipe(connect.reload());
	});

	gulp.task('jshint', function() {
		return gulp.src(APP_JS_FILES)
			.pipe(plumber(plumberErrorHandler))
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'));
	});

	gulp.task('wiredep', function () {
		gulp.src('./index.html')
		.pipe(plumber(plumberErrorHandler))
		.pipe(wiredep({
			directory: './libs'
		}))
		.pipe(gulp.dest('./'));
	});

	gulp.task('templates', function() {
		gulp.src(APP_HTML_FILES)
		.pipe(plumber(plumberErrorHandler))
		.pipe(templateCache({
			module: 'app.templates',
			standalone: true,
			root: 'app',
		}))
		.pipe(gulp.dest('./dist'));
	});

	gulp.task('compress', function() {
	    gulp.src('./index.html')
		.pipe(plumber(plumberErrorHandler))
		.pipe(useref.assets())
		.pipe(gulpif('*.js', uglify({mangle: false })))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(useref())
		.pipe(gulp.dest('./dist'));
  	});

  	gulp.task('uncss', function() {
		gulp.src('./dist/css/styles.min.css')
	  	.pipe(plumber(plumberErrorHandler))
	  	.pipe(uncss({
	    	html: ['./index.html']
	  	}))
	  	.pipe(gulp.dest('./dist/assets/css'));
	});

	gulp.task('watch', function() {
		gulp.watch([APP_HTML_FILES], ['html']);
		gulp.watch([ASSETS_STYLES_SASS_FILES], ['sass', 'compass', 'inject']);
		gulp.watch([APP_JS_FILES, './gulpfile.js'], ['jshint', 'inject']);
		gulp.watch(['./bower.json'], ['wiredep']);
	});

	gulp.task('default', ['server', 'dyson', 'wiredep', 'compass', 'inject', 'watch', 'tdd']);
  	gulp.task('build', ['templates', 'compress', 'copy', 'uncss']);

})();