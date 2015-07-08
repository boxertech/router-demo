/// <reference path="../typings/tsd.d.ts" />
(function(){
  module.exports = function(grunt){
    grunt.config('watch', {
      options: {
        //livereload: true,
        spawn: false
      },
      ngRouter: {
        files: [
          'src/ngRoute/**/*.html',
          'src/ngRoute/styles/**/*.css',
          'src/ngRoute/**/*.sass',
          'src/ngRoute/**/*.js'
        ],
        options: {
          livereload: { port: 35730}
        }
      },
      uiRouter: {
        files: [
          'src/uiRouter/**/*.html',
          'src/uiRouter/styles/**/*.css',
          'src/uiRouter/**/*.sass',
          'src/uiRouter/**/*.js'
        ],
        options: {
          livereload: {port: 35731}
        }
      },
      sass: {
        files: [
          'src/styles/**/*.css',
          'src/**/*.sass'
        ],
        options: {
          livereload: true,
          spawn: false
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
  };
}).call(this);
