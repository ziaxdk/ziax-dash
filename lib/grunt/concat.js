module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  return {
    concat: {
      build_js: {
        files: {
          'build/src/js/<%= buildno %>.min.js': [
            // 'build/src/js/lib/satellite.min.js',
            // 'build/src/js/lib/jquery-2.0.3.min.js',
            // 'build/src/js/lib/select2.min.js',
            'build/src/js/lib/angular.min.js',
            'build/src/js/lib/angular-route.min.js',
            'build/src/js/lib/angular-resource.min.js',
            'build/src/js/lib/angular-animate.min.js',
            'build/src/js/lib/textile.min.js',
            'build/src/js/lib/moment.min.js',
            'build/src/js/lib/leaflet.min.js',
            'build/src/js/lib/leaflet-bing.min.js',
            'build/src/js/lib-ext/leaflet-awesome-markers.min.js',
            'build/src/js/ziaxdash.min.js'
          ]
        }
      },
      build_css: {
        files: {
          'build/src/css/<%= buildno %>.min.css': [
            'build/src/css/animate.min.css',
            'build/src/css/leaflet.min.css',
            'build/src/css/ziaxdash.min.css',
            'build/src/css/leaflet-awesome-markers.min.css',
            'build/src/css/fa-4.0.3.min.css',
            'build/src/css/select2.min.css',
            'build/src/css/select2-bootstrap.min.css'
          ]
        }
      },
      build_dev: {
        options: {
          banner: "(function () {\r\nvar module = angular.module('ziaxdash', ['ngRoute', 'ngResource', 'ngAnimate']);\r\n",
          footer: '}());'
          // process: function (src, filePath) {
          //   var elements = src.split('\n');
          //   var finals = elements.splice(4, elements.length - 5);
          //   return finals.join('\n');
          //   //return src;
          // }
        },
        files: {
          'src/js/ziaxdash.js':  [ 'src/js/app/**/*.js' ]
        }
      }
    }
  };
};