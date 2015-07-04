/// <reference path="../src/d.ts/allClient.d.ts" />
(function(){
  module.exports = function(grunt){
    grunt.config('compass',{
      dev: {
        options: {
          httpPath: '<%= project.src.devClient %>',
          sassDir: '<%= project.src.devClient %>/styles/sass',
          cssDir: '<%= project.dest.devClient %>/styles',
          imageDir: '<%= project.dest.devClient %>/images',
          javascriptsDir: '<%= project.dest.devClient %>/js',
          fontsDir: '<%= project.dest.devClient %>/fonts',
          environment: 'development'
        }
      }
    });
    return grunt.loadNpmTasks('grunt-contrib-compass');
  };
}).call(this);