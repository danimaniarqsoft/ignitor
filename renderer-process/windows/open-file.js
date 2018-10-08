const {ipcRenderer} = require('electron')
const fs = require('fs');
const walk = require('walk');
const path = require('path');

const remote = require('electron').remote;
const app = remote.app;

const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
  var walker;

  options = {
      followLinks: false
    , filters: ["Temp", "_Temp"]
    };
    walker = walk.walkSync(path, options);
    var files = [];
  
    walker.on("directories", function (root, dirStatsArray, next) {
      next();
    });
   
    walker.on("file", function (root, fileStats, next) {
      files.push(fileStats.name);
      fs.readFile(fileStats.name, function () {
        document.getElementById('selected-file').innerHTML = files
        next();
      });
    });
   
    walker.on("errors", function (root, nodeStatsArray, next) {
      next();
    });
})

function scanFile (path) {

  var walker;

  options = {
      followLinks: false
    , filters: ["Temp", "_Temp"]
    };
    walker = walk.walkSync(path, options);
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
}
