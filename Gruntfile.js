module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dev: {
                files: {
                    'assets/src/js/bundle.js': ['assets/src/js/main.js']
                },
                options: {
                    watch: true
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        cwd: 'assets/src',
                        expand: true,
                        src: ['img/**/*', 'fonts/**/*'],
                        dest: 'assets/dist/'
                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'assets/dist/css/main.css': 'assets/src/css/main.css'
                }
            }
        },
        deconst_assets: {
            assets: {
                options: {
                    contentServiceUrl: 'http://docker:9000/',
                    contentServiceKey: 'horse',
                    files: ['assets/dist/**/*'],
                    output: [
                        {
                            dest: 'assets/src/css/less/deconst-variables.less',
                            format: 'less'
                        }
                    ]
                }
            },
            css_js: {
                options: {
                    files: ['assets/dist/css/main.css', 'assets/dist/js/main.min.js']
                }
            }
        },
        empty: {
            less_vars: {
                options: {
                    files: ['assets/src/css/less/deconst-variables.less']
                }
            }
        },
        less: {
            dev: {
                files: {
                    'assets/src/css/main.css': ['assets/src/css/less/main.less']
                },
                options: {
                    dumpLineNumbers: 'comments',
                    paths: ['assets/bower_components'],
                    strictMath: true,
                }
            },
            build: {
                files: {
                    'assets/dist/css/main.css': ['assets/src/css/less/main.less']
                },
                options: {
                    paths: ['assets/bower_components'],
                    strictMath: true,
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'assets/dist/js/main.min.js': [
                        'assets/src/js/bundle.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ['assets/src/css/less/**/*.less'],
                tasks: ['less:dev']
            },
            js: {
                files: ['assets/src/js/**/*.js'],
                tasks: ['browserify:dev']
            },
            livereload: {
                files: ['assets/src/css/main.css', 'assets/dist/js/main.js', 'templates/**/*.html'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-deconst-assets');

    grunt.registerMultiTask('empty', function () {
        var files = grunt.file.expand({filter: 'isFile'}, this.options().files);

        if(files.length === 0) {
            // create the files.
            var fs = require('fs');
            var path = require('path');

            this.options().files.forEach(function (file, index, scope) {
                var filePath = path.resolve(file);
                fs.writeFileSync(filePath, '');
            });

        }
        files.forEach(function (file, index, scope) {
            grunt.log.writeln('Emptying ' + file);
            grunt.file.write(file, '');
        });
    });

    grunt.registerTask('dev', [
        'empty:less_vars',
        'less:dev',
        'browserify:dev'
    ]);

    grunt.registerTask('build', [
        'empty:less_vars',
        'copy:build',
        'deconst_assets:assets',
        'less:dev',
        'cssmin:build',
        'browserify:dev',
        'uglify:build',
        'deconst_assets:css_js'
    ]);

};
