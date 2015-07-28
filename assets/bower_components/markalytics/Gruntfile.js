module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            preview: {
                options: {
                    keepalive: true
                }
            },
            test: {
                options: {
                    port: '8000'
                }
            }
        },
        jasmine: {
            'no-ga': {
                src: 'dist/**/*.js',
                options: {
                    host: 'http://127.0.0.1:8000',
                    outfile: 'tests/no-ga/_SpecRunner.html',
                    specs: 'tests/no-ga/*-spec.js',
                    template: 'tests/no-ga/index.html'
                }
            },
            'ga': {
                src: 'dist/**/*.js',
                options: {
                    host: 'http://127.0.0.1:8000',
                    outfile: 'tests/ga/_SpecRunner.html',
                    specs: 'tests/ga/*-spec.js',
                    template: 'tests/ga/index.html'
                }
            },
            'gtm': {
                src: 'dist/**/*.js',
                options: {
                    host: 'http://127.0.0.1:8000',
                    outfile: 'tests/gtm/_SpecRunner.html',
                    specs: 'tests/gtm/*-spec.js',
                    template: 'tests/gtm/index.html'
                }
            }
        },
        umd: {
            all: {
                options: {
                    src: 'src/markalytics.js',
                    dest: 'dist/markalytics.js',
                    amdModuleId: 'markalytics',
                    objectToExport: 'markalytics'
                }
            }
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['umd:all']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-umd');

    grunt.registerTask('dev', ['connect:test','watch:js']);

    grunt.registerTask('test', function () {
        var args = ['jasmine'];

        for(var index in arguments) {
            args.push(arguments[index]);
        }

        grunt.task.run('umd');
        grunt.task.run('connect:test');
        grunt.task.run(args.join(':'));
    });
};
