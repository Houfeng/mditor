var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require("del");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var header = require('gulp-header');
var uglify = require("gulp-uglify");
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var gzip = require('gulp-gzip');
var pkg = require("./package.json");

var banner = ['/**',
	' * <%= name %> , <%= description %>',
	' * @version v<%= version %>',
	' * @homepage <%= homepage %>',
	' * @license <%= license %>',
	' * @author <%= author.name %>',
	' * @email <%= author.email %>',
	' * @blog <%= author.url %>',
	' */',
	''
].join('\r\n');

gulp.task('clear', function (cb) {
	del(['build'], cb);
});

gulp.task('browserify', function () {
	return browserify('./client/index.js')
		.bundle()
		.pipe(source(pkg.name + '.js'))
		.pipe(buffer())
		.pipe(replace("{version}", pkg.version))
		.pipe(replace("{homepage}", pkg.homepage))
		.pipe(header(banner, pkg))
		.pipe(gulp.dest('./build/js/'))
		.pipe(uglify({
			mangle: {
				except: ['require', 'exports', 'module', '__filename', '__dirname']
			}
		}))
		.pipe(header(banner, pkg))
		.pipe(rename(pkg.name + '.min.js'))
		.pipe(gulp.dest("./build/js/"));
	//.pipe(gzip())
	//.pipe(rename(pkg.name + '.gz.js'))
	//.pipe(gulp.dest("./build/js/"));
});

gulp.task('css', function () {
	gulp.src([
		"./node_modules/font-awesome/css/font-awesome.css",
		"./node_modules/github-markdown-css/github-markdown.css",
		"./node_modules/highlight.js/styles/default.css",
		"./client/style.css"
	])
		.pipe(concat(pkg.name + '.css'))
		.pipe(header(banner, pkg))
		.pipe(gulp.dest("./build/css/"))
		.pipe(minifycss())
		.pipe(header(banner, pkg))
		.pipe(rename(pkg.name + '.min.css'))
		.pipe(gulp.dest("./build/css/"));
	//.pipe(gzip())
	//.pipe(rename(pkg.name + '.gz.css'))
	//.pipe(gulp.dest("./build/css/"));
});

gulp.task('font', function () {
	gulp.src(["./node_modules/font-awesome/fonts/*.*"])
		.pipe(gulp.dest("./build/fonts/"));
});

gulp.task('lint', function () {
	return gulp.src(['./lib/*.js', './client/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('build', ["browserify", "css", "font"]);

gulp.task('default', ["clear", "build"]);

//end