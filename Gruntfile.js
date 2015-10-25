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
            },
            carina: {
                files: {
                    'assets/getcarina.com/src/js/bundle.js': ['assets/getcarina.com/src/js/site.js']
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
                        src: [
                          'img/**/*',
                          'fonts/**/*',
                        ],
                        dest: 'assets/dist/'
                    },
                    {
                        cwd: 'assets/getcarina.com/src',
                        expand: true,
                        src: [
                          'img/**/*',
                          'fonts/**/*',
                        ],
                        dest: 'assets/getcarina.com/dist/'
                    },
                    {
                      cwd: 'assets/bower_components/fontawesome',
                      expand: true,
                      src: [
                        'fonts/**/*'
                      ],
                      dest: 'assets/dist/'
                    },
                    {
                      cwd: 'assets/bower_components/drc-icons/dist',
                      expand: true,
                      src: [
                        'fonts/**/*'
                      ],
                      dest: 'assets/dist/'
                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'assets/dist/css/main.css': 'assets/src/css/main.css',
                    'assets/getcarina.com/dist/css/main.css': 'assets/getcarina.com/src/css/main.css'
                }
            }
        },
        deconst_assets: {
            assets: {
                options: {
                    files: ['assets/dist/**/*'],
                    output: [
                        {
                            dest: 'assets/src/css/less/deconst-variables.less',
                            format: 'less'
                        }
                    ]
                }
            },
            carina_assets: {
                options: {
                    files: ['assets/getcarina.com/dist/**/*'],
                    output: [
                        {
                            dest: 'assets/getcarina.com/src/css/less/deconst-variables.less',
                            format: 'less'
                        }
                    ]
                }
            },
            css_js: {
                options: {
                    files: ['assets/dist/css/main.css', 'assets/dist/js/main.min.js']
                }
            },
            carina_css_js: {
                options: {
                    files: ['assets/getcarina.com/dist/css/main.css', 'assets/getcarina.com/dist/js/site.min.js']
                }
            }
        },
        empty: {
            less_vars: {
                options: {
                    files: [
                      'assets/src/css/less/deconst-variables.less',
                      'assets/getcarina.com/src/css/less/deconst-variables.less'
                    ]
                }
            }
        },
        less: {
            dev: {
                files: {
                    'assets/src/css/main.css': ['assets/src/css/less/main.less'],
                    'assets/getcarina.com/src/css/main.css': ['assets/getcarina.com/src/css/less/main.less']
                },
                options: {
                    dumpLineNumbers: 'comments',
                    paths: ['assets/bower_components'],
                    strictMath: true,
                }
            },
            build: {
                files: {
                    'assets/dist/css/main.css': ['assets/src/css/less/main.less'],
                    'assets/getcarina.com/dist/css/main.css': ['assets/getcarina.com/src/css/less/main.less']
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
                    ],
                    'assets/getcarina.com/dist/js/site.min.js': [
                      'assets/getcarina.com/src/js/bundle.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ['assets/**/src/css/less/**/*.less'],
                tasks: ['less:dev']
            },
            js: {
                files: ['assets/src/js/**/*.js', '!assets/src/js/bundle.js'],
                tasks: ['browserify:dev']
            },
            carina_js: {
              files: ['assets/getcarina.com/src/js/**/*.js', '!assets/getcarina.com/src/js/bundle.js'],
              tasks: ['browserify:carina']
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
        'deconst_assets:carina_assets',
        'less:dev',
        'cssmin:build',
        'browserify:dev',
        'browserify:carina',
        'uglify:build',
        'deconst_assets:css_js',
        'deconst_assets:carina_css_js'
    ]);

    grunt.registerTask('default', ['build']);

};
