const {ipcRenderer} = require('electron')
const fs = require('fs');
const walk = require('walk');
const path = require('path')

const selectDirBtn = document.getElementById('select-directory')

const notification = {
  title: 'Kukulkan :: Full Scan Finished',
  body: 'Kukulkan have finish your scan, check out the results',
  icon: path.join(__dirname, '../../assets/img/bell.png')
}

var walker;
 
  options = {
    followLinks: false
  , filters: ["Temp", "_Temp"]
  };

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
  document.getElementById('selected-file').innerHTML = `Scan: ${path}`
  walker = walk.walk(`${path}`, options);
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
 
  walker.on("end", function () {
    const myNotification = new window.Notification(notification.title, notification)
    document.getElementById('selected-file').innerHTML = `Scan: ${files}`
  });

})
