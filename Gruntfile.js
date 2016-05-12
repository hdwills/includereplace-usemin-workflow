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
            cwd: '<%= config.src %>/pages/',
            src: '*.html',
            dest: '<%= config.dest %>/pages/'
          }
        ]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/sass/',
          src: ['style.scss'],
          dest: '<%= config.src %>/css/',
          ext: '.css'
        }]
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: '<%= config.src %>/',
        src: [
          'js/jquery-1.9.1.min.js'
        ],
        dest: '<%= config.dest %>/'
      }
    },

    filerev: {
      css: {
        src: '<%= config.dest %>/css/style.css'
      },
      js: {
        src: [
          '<%= config.dest %>/js/**/{,*/}*.js',
          '!<%= config.dest %>/js/jquery-1.9.1.min.js'
        ]
      }
    },

    concat: {
      js: {
        src: [
          '<%= config.src %>js/bootstrap/collapse.js',
          '<%= config.src %>js/bootstrap/dropbox.js',
          '<%= config.src %>js/bootstrap/modal.js',
          '<%= config.src %>js/bootstrap/tab.js'
        ],
        dest: '<%= config.dest %>/js/bootstrap.js'
      }
    },

    cssmin: {
      generated: {
        files: [
          {
            src: '<%= config.src %>/css/style.css',
            dest: '<%= config.dest %>/css/style.css'

          }
        ]
      }
    },

    useminPrepare: {
      html: 'html/index.html',
      options: {
        root: '<%= config.dest %>',
        dest: '<%= config.dest %>'
      }
    },

    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dest %>/',
          '<%= config.dest %>/css/'
        ]
      },
      css: '<%= config.dest %>/css/style*.css',
      html: '<%= config.dest %>/pages/*.html'
    }

  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // RegisterTask
  grunt.registerTask('default', [
    'clean:release',
    'copy',
    'includereplace',
    'concat',
    'cssmin',
    'filerev',
    'usemin'
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
