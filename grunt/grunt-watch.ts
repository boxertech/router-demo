/// <reference path="../src/d.ts/allClient.d.ts" />
(function(){
  module.exports = function(grunt){
    grunt.config('watch', {
      options: {
        livereload: true,
        spawn: false
      },
      server: {
        files: [
          'src/**/*.html',
          'src/styles/**/*.css',
          'src/**/*.sass',
          'src/**/*.js'
        ]
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
