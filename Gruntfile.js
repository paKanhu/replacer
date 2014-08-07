module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: {
        src: ['dist']
      },
      tmp: {
        src: ['.tmp']
      },
      grunt: {
        src: ['.grunt']
      }
    },

    copy: {
      dist: {
        files: [{
          src: 'src/index.html',
          dest: 'dist/index.html'
        }, {
          src: 'LICENSE',
          dest: 'dist/LICENSE.md'
        }, {
          src: 'README.md',
          dest: 'dist/README.md'
        }, {
          src: 'src/favicon.ico',
          dest: 'dist/favicon.ico'
        }, {
          src: 'src/apple-touch-icon-precomposed.png',
          dest: 'dist/apple-touch-icon-precomposed.png'
        }, {
          expand: true,
          cwd: 'src/fonts/',
          src: ['**'],
          dest: 'dist/fonts/'
        }, {
          expand: true,
          cwd: 'src/js/vendor/',
          src: ['**'],
          dest: 'dist/js/vendor/'
        }]
      },
      sitemap: {
        files: [
        {
          src: 'src/sitemap.xml',
          dest: 'dist/sitemap.xml'
        }]
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
        compress: {
          drop_console: true
        },
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/js/script.min.js': ['src/js/bootstrap/*.js', 'src/js/*.js']
        }
      }
    },

    uncss: {
      dist: {
        options: {
          ignore: ['.collapsing',
            /\.((error)|(custom))?(m|M)odal[\w.>\- ]*/,
            /#replacement-text-list[\w>:]*/,
            '.col-xs-8',
            '.col-sm-4',
            '.col-sm-5',
            '.col-md-2',
            '.col-md-3',
            '.col-md-5',
            '.col-md-offset-3',  // /\.col\-[\w-]+/
            'kbd',
            /\.no\-js [\w\-#>]*/,
            /(.js )?#no-js[\w-]*/
          ]
        },
        files: {
          '.tmp/css/style.css': ['src/index.html']
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: '.tmp/css/style.css',
        dest: 'dist/css/style.min.css'
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/replacer.zip'
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**', '!*.zip']
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'dist',
        tag: 'v<%= pkg.version %>',
        message: 'Update v<%= pkg.version %>'
      },
      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', [
    'clean',
    'copy:dist',
    'processhtml',
    'htmlmin',
    'uglify',
    'uncss',
    'cssmin',
    'compress',
    'copy:sitemap',
    'clean:tmp'
  ]);
  grunt.registerTask('update', ['clean:grunt', 'gh-pages', 'clean:grunt']);
};
