const {ipcRenderer} = require('electron')
const fs = require('fs');
const walk = require('walk');
const path = require('path');

exports.scanFile = function (path) {
  var walker;

options = {
    followLinks: false
  , filters: ["Temp", "_Temp"]
  };
  walker = walk.walk(path, options);
  var files = [];

  walker.on("directories", function (root, dirStatsArray, next) {
    next();
  });
 
  walker.on("file", function (root, fileStats, next) {
    files.push(fileStats.name);
    fs.readFile(fileStats.name, function () {
      next();
    });
  });
 
  walker.on("errors", function (root, nodeStatsArray, next) {
    next();
  });
  return "holas";
};