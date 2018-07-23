const browserSync = require('browser-sync');
const path = require('path');


module.exports = function(gulp, plugins) {
    const paths = {
        'watch': [
            // pug files to watch for changes
            'assets/templates/**/*.pug'
        ],
        'build': [
            // pug files to build
            'assets/templates/views/**/*.pug',
            '!assets/templates/views/**/_*.pug'
        ]
    };


    gulp.task(
        'build:templates',
        'compiles the pug templates to the build folder',
        function() {
            return gulp.src(paths.build)
                .pipe(plugins.pug({'basedir': path.join(gulp.inputPath, 'templates')}))
                .on('error', plugins.notify.onError(function(err) {
                    return err.message + ' in ' + err.fileName + ' at line ' + err.lineNumber;
                }))
                .pipe(gulp.dest(gulp.outputPath))
                .pipe(browserSync.reload({'stream': true}))
                .pipe(plugins.notify({'message': 'Pug compilation complete', 'onLast': true}));
        }
    );


    gulp.task(
        'watch:templates',
        'watches the templates folder for changes and recompiles them',
        ['build:templates'],
        function() {
            gulp.watch(paths.watch, ['build:templates']);
        }
    );
};