module.exports = function (grunt) {

  grunt.initConfig({

    config: {
      src: 'source',
      dest: 'dist',
      tmp: '.tmp'
    },

    clean: {
      release: {
        src: ['<%= config.dest %>','<%= config.tmp %>']
      }
    },

    includereplace: {
      template: {
        files: [
          {
            expand: true,
            cwd: 'include',
            src: '*.html',
            dest: 'html'
          }
        ]
      }
    },

    copy: {
      dist: {
        expand: true,
        src: [
          'html/**/*.html'
        ],
        dest: '<%= config.dest %>'
      }
    },

    concat: {
      generated: {
        files: [
          {
            src: [
              'css/style.css',
              'plugins/flexslider.css'
            ],
            dest: '<%= config.tmp %>/css/style.css'
          },
          {
            src: [
              'js/jquery-1.8.2.min.js',
              'js/bootstrap.min.js'
            ],
            dest: '<%= config.dest %>/js/app.js'
          }
        ]
      }
    },

    cssmin: {
      generated: {
        files: [
          {
            src: '<%= config.tmp %>/css/style.css',
            dest: '<%= config.dest %>/css/style.css'

          }
        ]
      }
    },

    useminPrepare: {
      html: 'html/index.html',
      options: {
        root: '.',
        dest: '<%= config.dist %>'
      }
    },

    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dest %>'
        ]
      },
      html: '<%= config.dest %>/html/**/*.html'
    }

  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // RegisterTask
  grunt.registerTask('default', [
    'clean:release',
    'useminPrepare',
    'includereplace',
    'copy',
    'concat',
    'usemin',
    'cssmin'
  ])
}

///.
//├─html
//│  └─*.html
//├─css
//│  └─*.css
//├─img
//│  └─*.{jpg,png}
//│
//├─dist
//│  └─html
//│  │  └─*.html
//│  └─css
//│  │  └─*.min.css
//│  └─img
//└───  └─*.{jpg,png}
