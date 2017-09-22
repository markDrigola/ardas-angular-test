module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/jasmine-promises/dist/jasmine-promises.js',
            'public/javascripts/**/*.spec.js',
        ],

        preprocessors: {
            'public/javascripts/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },
        browsers: ['PhantomJS'],
        singleRun: true

        // define reporters, port, logLevel, browsers etc.
    });
};