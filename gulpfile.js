const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concatCSS = require('gulp-concat-css'),
      livereload = require('gulp-livereload'),
      connect = require('gulp-connect'),
      useref = require('gulp-useref'),
      autoprefixer = require('gulp-autoprefixer'),
      gulpif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      cssmin = require('gulp-clean-css'),
      jshint = require("gulp-jshint"),
      rigger = require('gulp-rigger'),
      imagemin = require('gulp-imagemin'),
      rimraf = require('rimraf'),
      sourcemaps = require('gulp-sourcemaps'),
      watch = require('gulp-watch'),
      spritesmith = require("gulp.spritesmith"),
      babel = require('gulp-babel');

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        sass: 'app/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        sprites: 'app/img/',
    },
    app: {
        html: 'app/*.html',
        js: 'app/js/[^_]*.js',
        jshint: 'app/js/*.js',
        sass: 'app/sass/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*',
        sprites: 'app/css/sprites/*.png',
        spritesCss: 'app/sass/'
    },
    watch: {
        html: 'app/*.html',
        js: 'app/js/**/*.js',
        css: 'app/css/**/*.*',
        sass: 'app/sass/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*',
        sprites: 'app/css/sprites/*.png'
    },
    clean: './build',
    rootDir: './build'
};
//server connect
gulp.task('connect', () => {
  connect.server({
    root: [path.rootDir],
    livereload: true
  });
});

// sprites
gulp.task('sprites:build', () => {
    const spriteData =
        gulp.src(path.app.sprites)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                imgPath: '../img/sprite.png',
                cssFormat: 'scss',
                cssVarMap: (sprite) => {
                    sprite.name = 'icon-' + sprite.name
                }
            }));
    spriteData.img.pipe(gulp.dest(path.build.sprites));
    spriteData.css.pipe(gulp.dest(path.app.spritesCss));
});

//html
gulp.task('html:build', () => {
    gulp.src(path.app.html)
    .pipe(rigger())
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssmin()))
    .pipe(gulp.dest(path.build.html))
    .pipe(connect.reload());
});

//sass
gulp.task('sass:build', () => {
  gulp.src(path.app.sass)
    .pipe(sass({
      includePaths: [
        'node_modules/foundation-sites/scss'
      ]
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9'],
        cascade: false
    }))
    .pipe(gulp.dest(path.build.sass))
    .pipe(connect.reload());
});

//fonts
gulp.task('fonts:build', () => {
    gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

//jshint
gulp.task('jshint:build', () => {
    gulp.src(path.app.jshint)
    .pipe(jshint());
});

//js
gulp.task('js:build', () => {
    gulp.src(path.app.js)
    .pipe(rigger())
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.app.js))
    .pipe(connect.reload())
});

// image
gulp.task('image:build', () => {
    gulp.src(path.app.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload())
});
//other files
gulp.task('other', () => {
     gulp.src(['app/css/ajax-loader.gif', 'app/css/fonts/'])
        .pipe(gulp.dest('build/css'));
     gulp.src('app/css/fonts/*.*')
        .pipe(gulp.dest('build/css/fonts'));
});
//clean
gulp.task('clean', (cb) => {
    rimraf(path.clean, cb);
});

// watch
gulp.task('watch', () => {
    watch([path.watch.html, 'app/include/*.html'], (event, cb) => {
        gulp.start('html:build');
    });
    watch([path.watch.sprites], (event, cb) => {
        gulp.start('sprites:build');
    });
    watch([path.watch.css], (event, cb) => {
        gulp.start('html:build');
    });
    watch([path.watch.sass], (event, cb) => {
        gulp.start('sass:build');
    });
    watch([path.watch.js], ['jshint']);
    watch([path.watch.js], (event, cb) => {
        gulp.start('js:build');
    });
    watch([path.watch.img], (event, cb) => {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts:build');
    });
});

// default
gulp.task('default', ['connect', 'other', 'sprites:build', 'html:build', 'sass:build', 'fonts:build', 'js:build', 'image:build', 'jshint:build', 'watch']);
