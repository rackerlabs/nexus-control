module.exports = function (grunt) {
    grunt.initConfig({
        webfont: {
            drc: {
                src: 'src/drc-icon/*.svg',
                dest: 'dist/fonts',
                destCss: 'dist/less',
                options: {
                    font: 'drc-icons',
                    fontFilename: 'drc-icons',
                    htmlDemo: false,
                    relativeFontPath: '../',
                    stylesheet: 'less',
                    template: 'src/drc-icon/template/template.css',
                    templateOptions: {
                        classPrefix: 'drc-icon-'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webfont');
};
