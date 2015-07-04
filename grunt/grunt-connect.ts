/// <reference path="../src/d.ts/allClient.d.ts" />
(function(){
  module.exports = function(grunt){
    var mountFolder = function(connect, dir) {
      return connect.static(require('path').resolve(dir));
    }

    grunt.config('connect', {
      options: {
        port: 8080,
        hostname: '*',
        livereload: true
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              mountFolder(connect, 'src'),
              mountFolder(connect, '.')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
  };
}).call(this);
