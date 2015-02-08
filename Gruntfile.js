module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'clean': {
      build: {
        src: ["build", "dist"]
      }
    },

    'copy': {
      pub: {
        files: [
          {
            cwd: 'pub',
            src: '**/*',
            dest: 'build',
            expand: true
          },
        ]
      },
      bower: {
        files: [
          {
            src: 'bower_components/requirejs/require.js',
            dest: 'build/js/require.js'
          },
          {
            src: 'bower_components/require-cs/cs.js',
            dest: 'build/js/cs/cs.js'
          },
          {
            src: 'bower_components/coffeescript/extras/coffee-script.js',
            dest: 'build/js/coffee-script/coffee-script.js'
          }
        ]
      },
      js: {
        files: [
          {
            cwd: 'src/js',
            src: '**/*',
            dest: 'build/js',
            expand: true
          },
        ]
      },
    },

    'jade': {
      index: {
        options: {
          pretty: true
        },
        files: [{
          "build/index.html": "src/jade/index.jade"
        }]
      }
    },

    'stylus': {
      compile: {
        options: {
          compress: false
        },
        files: {
          "src/css/stylus.css": "src/stylus/*.styl"
        }
      }
    },

    'requirejs': {
      compile: {
        options: {
          allowSourceOverwrites: true,
          appDir: "build",
          baseUrl: "build/js",
          dir: "dist",
        }
      }
    },
  });



  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');


  grunt.registerTask('cleanup', [
    'clean:build',
  ]);

  grunt.registerTask('build', [
    'cleanup',
    'copy:bower',
    'copy:pub',
    'copy:js',
    'jade:index',
  ]);

  grunt.registerTask('dist', [
    'build',
    'requirejs:compile'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
