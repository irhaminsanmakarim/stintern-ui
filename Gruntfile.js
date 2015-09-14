module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    concat: {
      dist: {
        src: ["bower_components/jquery/dist/jquery.js", "bower_components/bootstrap-sass/assets/javascripts/bootstrap.js", "js/main.js"],
        dest: "js/script.js",
      }
    },

    uglify: {
      global: {
        files: {
          "js/script.min.js": ["js/script.js"]
        }
      }
    },

    sass: {
      global: {
        options: {
          style: "expanded"
        },
        files: {
          "css/app-unprefixed.css": "scss/app.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "css/app-unprefixed.css",
        dest: "css/app.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl="
      },
      jekyllBuild: {
        command: "jekyll build --config _config-dev.yml"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["index.html", "_layouts/*.html", "_posts/*.md", "_includes/*.html", "student/*.html", "boss/*.html", "public/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["concat", "uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["scss/*.scss", "scss/**/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: ["fill", "stroke"],
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch"]);

};