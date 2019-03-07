const webpackConfig = require('./configs/webpack.prod.config');

module.exports = function(grunt) {


    grunt.initConfig({
        

        webpack: {
                options: {
                    stats: true
                },
                prod: webpackConfig 
        },

        clean: ['public'],

        copy: {
            
            content: {

                files: [{
                        expand: true,
                        flatten: true,
                        src: [],
                        dest: './public/'
                    }
                ]
            }

        },

        uglify: {
            
            build: {

                files: [

                    {
                        expand: true,
                        cwd: './public/',
                        src: ['*.js', '!*-debug.js','!*.min.js'],
                        dest: './public/',
                        ext: '.js'
                    }
                ]

            }

        },

        cssmin: {
            target: {
              files: [{
                expand: true,
                cwd: './public/',
                src: ['*.css', '!*.min.css'],
                dest: './public/',
                ext: '.css'
              }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('default', [
        'clean',
        'webpack',
        'copy',
        'uglify',
        'cssmin'
    ]);

};