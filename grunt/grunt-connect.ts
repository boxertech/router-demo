/// <reference path="../typings/tsd.d.ts" />

(function(){
  module.exports = function(grunt){
    var mountFolder = function(connect, dir) {
      return connect.static(require('path').resolve(dir));
    }

    grunt.config('connect', {
      options: {
        hostname: '*',
        livereload: true
      },
      ngRoute: {
        options: {
          port: 8080,
          base: {path: 'src/ngRoute'},
          middleware: function(connect) {
            return [
              mountFolder(connect, 'src/ngRoute'),
              mountFolder(connect, '.')
            ];
          }
        }
      },
      uiRoute: {
        options: {
          port: 8081,
          middleware: function(connect) {
            return [
              mountFolder(connect, 'src/uiRouter'),
              mountFolder(connect, '.')
            ];
          }
        }
      },
      dist: {
        port: 8080,
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
