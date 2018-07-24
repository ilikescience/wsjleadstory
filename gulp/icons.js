const browserSync = require('browser-sync');

module.exports = function(gulp, plugins, env) {
    const paths = [
        // svgs to process
        'assets/icons/**/*'
    ];


    gulp.task('build:icons', 'compresses icons, creates a single svg and moves it to the build folder', function() {
        return gulp.src(paths, {'base': gulp.inputPath})
            .pipe(plugins.newer(gulp.outputPath))
            .pipe(plugins.svgmin())
            .pipe(plugins.svgstore())
            .pipe(plugins.rename('icons.svg'))
            .pipe(gulp.dest(gulp.outputPath))
            .pipe(browserSync.reload({'stream': true}))
            .pipe(plugins.notify({'message': 'Icon processing complete', 'onLast': true}));
    });        


    gulp.task(
        'watch:icons',
        'watches the source icons folders and processes them when changed',
        ['build:icons'],
        function() {
            gulp.watch(paths, ['build:icons']);
        }
    );
};