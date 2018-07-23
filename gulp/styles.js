const browserSync = require('browser-sync');

module.exports = function(gulp, plugins, env) {
    const paths = {
        'watch': [
            // css files to watch for changes when triggering rebuilds
            'assets/styles/**/*.css'
        ],
        'build': [
            // css files to build
            'assets/styles/main.css'
        ]
    };

    gulp.task('build:styles', 'compiles all css files into the build folder', function() {
        return gulp.src(paths.build, {'base': gulp.inputPath})
            .pipe(plugins.postcss())
            .on('error', plugins.notify.onError(function(err) {
                return err.message + ' in ' + err.fileName + ' at line ' + err.lineNumber;
            }))
            .pipe(gulp.dest(gulp.outputPath))
            .pipe(plugins.filter('**/*.css'))
            .pipe(browserSync.reload({'stream': true}))
            .pipe(plugins.notify({'message': 'CSS compilation complete', 'onLast': true}));
    });


    gulp.task(
        'watch:styles',
        'waits for css files to change, then rebuilds them',
        ['build:styles'],
        function() {
            gulp.watch(paths.watch, ['build:styles']);
        }
    );
};