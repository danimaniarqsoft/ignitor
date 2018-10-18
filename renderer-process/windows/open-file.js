const fs = require('fs')
const path = require('path')
const scanFile = require('scan-files')
const dirTree = require('directory-tree');

const selectDirBtn = document.getElementById('select-directory')
const { ipcRenderer } = require('electron')

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, sourcePath) => {
  var sourceFolder = dirTree(path.join(sourcePath.toString()))
  var jsonFolder = fs.readFileSync(path.join(sourcePath.toString(), '.meta-info.json'))
  var originalFolder = JSON.parse(jsonFolder)
  var differences = scanFile.diff(originalFolder, sourceFolder)
  var output = ""
  scanFile.print(differences.result, function (currentFile, deep) {
    var nameFormat = ""
    if (currentFile.isPresent === undefined || currentFile.isPresent === false) {
      nameFormat = "<strike>" + currentFile.name + "</strike>"
    } else {
      nameFormat = currentFile.name
    }
    output = output + "<br>" + leadinSpaces(deep, nameFormat)
  })
  document.getElementById('folder-output').innerHTML = output
})

var leadinSpaces = function (deep, cadena) {
  var spaces = ''
  for (let index = 0; index < deep; index++) {
    spaces = spaces + '&nbsp;'
  }
  return spaces + cadena
}
