const fs = require('fs')
const path = require('path')
const scanFile = require('./scan-files')
const selectDirBtn = document.getElementById('select-directory')
const { ipcRenderer } = require('electron')
const diff = require('deep-diff').diff
const observableDiff = require('deep-diff').observableDiff
const applyChange = require('deep-diff').applyChange

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, sourcePath) => {
  var temp = scanFile.readFolderStructure(path.join(sourcePath.toString()))
  var fixDataString = JSON.stringify(temp, null, 4)
  var sourceFolder = JSON.parse(fixDataString)
  var originalFolder = fs.readFileSync(path.join(sourcePath.toString(), '.meta-info.json'))
  var jsonContent = JSON.parse(originalFolder)
  var differences = diff(jsonContent, sourceFolder)

  //fs.writeFile(path.join(sourcePath.toString(), '.meta-info-diff.json'), JSON.stringify(jsonContent, null, 4), (err) => {
  // if (err) throw err
  //})
  observableDiff(jsonContent, sourceFolder, function (d) {
    if (d.path[d.path.length - 1] !== 'path') {
      //applyChange(lhs, rhs, d);
      document.getElementById('selected-file').innerHTML = 'before: ' + d.lhs + ', after: ' + d.rhs
    }
  });
})
