module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dev: {
                files: {
                    'assets/src/js/bundle.js': ['assets/src/js/main.js']
                },
                options: {
                    transform: ['brfs'],
                    watch: true
                }
            },
            support: {
                files: {
                    'assets/support.rackspace.com/src/js/bundle.js': ['assets/support.rackspace.com/src/js/site.js']
                },
                options: {
                    transform: ['brfs', 'envify'],
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
                        cwd: 'assets/support.rackspace.com/src',
                        expand: true,
                        src: [
                          'img/**/*',
                          'fonts/**/*',
                        ],
                        dest: 'assets/support.rackspace.com/dist/'
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
                    },
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'assets/dist/css/main.css': 'assets/src/css/main.css',
                    'assets/support.rackspace.com/dist/css/main.min.css': 'assets/support.rackspace.com/dist/css/main.css'
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
            support_assets: {
                options: {
                    files: ['assets/support.rackspace.com/dist/**/*'],
                    output: [
                        {
                            dest: 'assets/support.rackspace.com/src/css/_sass/deconst-variables.scss',
                            format: 'scss'
                        }
                    ]
                }
            },
            css_js: {
                options: {
                    files: ['assets/dist/css/main.css', 'assets/dist/js/main.min.js']
                }
            },
            support_css_js: {
                options: {
                    files: ['assets/support.rackspace.com/dist/css/main.css', 'assets/support.rackspace.com/dist/js/site.min.js']
                }
            }
        },
        empty: {
            less_vars: {
                options: {
                    files: [
                      'assets/src/css/less/deconst-variables.less',
                      'assets/support.rackspace.com/src/css/_sass/deconst-variables.scss'
                    ]
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
        sass: {
            options: {
                style: 'expanded',
                loadPath: 'assets/support.rackspace.com/src/css/_sass',
            },
            build: {
                files: {
                    'assets/support.rackspace.com/dist/css/main.css': 'assets/support.rackspace.com/src/css/main.scss'
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'assets/dist/js/main.min.js': [
                      'assets/src/js/bundle.js'
                    ],
                    'assets/support.rackspace.com/dist/js/site.min.js': [
                      'assets/support.rackspace.com/src/js/bundle.js'
                    ],
                    'assets/support.rackspace.com/dist/js/carousel.min.js': [
                      'assets/support.rackspace.com/carousel.min.js'
                    ]
                }
            }
        },
        watch: {
            less: {
                files: ['assets/**/src/css/less/**/*.less'],
                tasks: ['less:dev']
            },
            sass: {
                files: ['assets/**/src/css/_sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['assets/src/js/**/*.js', '!assets/src/js/bundle.js'],
                tasks: ['browserify:dev']
            },
            support_js: {
              files: ['assets/support.rackspace.com/src/js/**/*.js', '!assets/support.rackspace.com/src/js/bundle.js'],
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
    grunt.loadNpmTasks('grunt-contrib-sass');
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
        'sass',
        'browserify:dev'
    ]);

    grunt.registerTask('build', [
        'empty:less_vars',
        'copy:build',
        'deconst_assets:assets',
        'deconst_assets:support_assets',
        'less:dev',
        'sass',
        'cssmin:build',
        'browserify:dev',
        'browserify:support',
        'uglify:build',
        'deconst_assets:css_js',
        'deconst_assets:support_css_js'
    ]);

    grunt.registerTask('default', ['build']);

};
