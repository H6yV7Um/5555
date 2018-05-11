
module.exports = function(grunt) {

  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    dist: {
      src: 'app/public/js/app.js',
      dest: 'v/public/js/app.min.js'
    }
  },
  less: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    dist: {
      src: 'app/public/css/web.less',
      dest: 'v/public/css/web.css'
    }
  },
  //  copy: {
  //   options: {
  //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  //   },
  //   dist: {
  //     src: 'app/liveShare/index.html',
  //     dest: 'dist/html/index.html'
  //   }
  // },
  // concat: {
  //   options: {
  //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
  //   },
  //   dist: {
  //     src: 'app/html/*.html',
  //     dest: 'dist/html/*.html'
  //   }
  // },
  watch: {
      // html: {
      //   files: ['skins/**.html'],
      //   options: {livereload:true}
      // },
      // css: {
      //   files: ['assets/**/*.css','skins/**/*.css'],
      //   options: {livereload:true}
      // },
      // js: {
      //   files: ['assets/**/*.js'],
      //   options: {livereload:true}
      // },
      less: {
        files: ['app/public/css/web.less'],
        tasks: ['less']
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify','less','watch']);//,'copy','concat'

};