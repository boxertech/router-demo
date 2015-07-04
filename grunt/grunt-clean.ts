/// <reference path="../src/d.ts/allClient.d.ts" />
(function(){
  module.exports = function(grunt){
    grunt.config('clean', 'dist');

    grunt.loadNpmTasks('grunt-contrib-clean');
  };
}).call(this);
