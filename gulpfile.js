var gulp          = require('gulp'),
    sass          = require('gulp-sass'),         //Подключаем Sass пакет
    browserSync   = require('browser-sync'),      // Подключаем Browser Sync
    concat        = require('gulp-concat'),       // Подключаем gulp-concat (для конкатенации файлов)
    uglify        = require('gulp-uglifyjs'),     // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano       = require('gulp-cssnano'),      // Подключаем пакет для минификации CSS
    rename        = require('gulp-rename'),       // Подключаем библиотеку для переименования файлов
    del           = require('del'),               // Подключаем библиотеку для удаления файлов и папок
    imagemin      = require('gulp-imagemin'),     // Подключаем библиотеку для работы с изображениями
    pngquant      = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache         = require('gulp-cache'),        // Подключаем библиотеку кеширования
    autoprefixer  = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
    csso          = require('gulp-csso');

gulp.task('mytask', function () {

    return gulp.src('source-files') // Выборка исходных файлов для обработки плагином
        .pipe(plugin())               // Вызов Gulp плагина для обработки файла
        .pipe(gulp.dest('folder'));   // Вывод результирующего файла в папку назначения (dest - пункт назначения)

});

gulp.task('sass', function(){ // Создаем таск "sass"

    return gulp.src('public/javascripts/components/**/*.+(scss|sass)') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('public/vendor/css')) // Выгружаем результата в папку assets/css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении

});

gulp.task('browser-sync', function() { // Создаем таск browser-sync

    browserSync.init({
        proxy: "localhost:3000",
        notify: false	// Отключаем уведомления
    });

});

gulp.task('scripts', function() {

    return gulp.src([ // Берем все необходимые библиотеки
        'public/libs/aos-master/aos.js', // Подключаем любую библиотеку
        'assets/libs/jquery/dist/jquery.js', // Подключаем любую библиотеку
        'assets/libs/bootstrap/dist/js/bootstrap.min.js', // Подключаем любую библиотеку
        'assets/libs/slick-1.6.0/slick/slick.js', // Подключаем любую библиотеку
        'assets/libs/select2/dist/js/select2.js', // Подключаем любую библиотеку
        'assets/libs/contentMedia/contentMedia.min.js' // Подключаем любую библиотеку
    ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        // .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('public/javascripts')); // Выгружаем в папку assets/javascript

});

gulp.task('css-libs', ['sass'], function() {

    return gulp.src('public/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('public/css')); // Выгружаем в папку assets/css

});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {

    gulp.watch('public/javascripts/components/**/*.+(scss|sass)', ['sass']); // Наблюдение за sass файлами
    gulp.watch('public/javascripts/components/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('public/javascripts/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {

    return gulp.src('assets/images/**/*') // Берем все изображения из assets
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('assets/images')); // Выгружаем на продакшен

});

// gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
//
//     var buildCss = gulp.src([ // Переносим CSS стили в продакшен
// 			'assets/css/master.css',
// 			'assets/css/libs.min.css'
// 		])
//     .pipe(gulp.dest('dist/css'));
//
//     var buildFonts = gulp.src('assets/fonts/**/*') // Переносим шрифты в продакшен
//     .pipe(gulp.dest('dist/fonts'));
//
//     var buildJs = gulp.src('assets/javascript/**/*') // Переносим скрипты в продакшен
//     .pipe(gulp.dest('dist/js'));
//
//     var buildHtml = gulp.src('dist/*.htm') // Переносим HTML в продакшен
//     .pipe(gulp.dest('dist'));
//
// });

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
