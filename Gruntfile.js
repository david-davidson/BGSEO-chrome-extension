module.exports = function(grunt) {
  "use strict";

  var allJsFiles = [
    "content.js",
    "background.js",
    "Gruntfile.js"
  ];

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: allJsFiles
    },

    jscs: {
      src: allJsFiles
    },

    htmlhint: {
      build: {
        options: {
          "tag-pair": true,
          "tagname-lowercase": true,
          "attr-lowercase": true,
          "attr-value-double-quotes": true,
          "doctype-first": true,
          "spec-char-escape": true,
          "id-unique": true,
          "head-script-disabled": true,
          "style-disabled": true
        },
        src: [
          "popup.html"
        ]
      }
    },

    watch: {
      all: {
        files: allJsFiles.concat([
          "popup.html",
          "styles.css"
        ]),
        tasks: [
          "jshint",
          "jscs",
          "htmlhint"
        ]
      }
    }
  
  });

  grunt.registerTask("default", [
    "jshint",
    "jscs",
    "htmlhint",
    "watch"
  ]);
};