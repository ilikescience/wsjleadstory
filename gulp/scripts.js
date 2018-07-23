const browserSync = require('browser-sync');

module.exports = function(gulp, plugins, env) {
    const paths = {
        'watch': [
            // js files to watch
            'assets/scripts/**/*.js'
        ],
        'build': [
            // js files to watch for changes when triggering rebuilds
            'assets/scripts/index.js'
        ],
        
    };

    gulp.task(
        'build:scripts',
        'bundles all client-side javascript files into the build folder',
        function() {
            return gulp.src(paths.build, {'base': gulp.inputPath})
                .pipe(plugins.babel({
                    presets: ['env']
                }))
                .pipe(gulp.dest(gulp.outputPath))
                .pipe(plugins.notify({'message': 'JS compilation complete', 'onLast': true}));
        }
    );


    gulp.task(
        'watch:scripts',
        'waits for client-side javascript files to change, then rebuilds them',
        function() {
            gulp.watch(paths.watch, ['build:scripts']);
        }
    );

};