const fs = require('fs');
const path = require('path');
const scanFile = require('./scan-files')
const selectDirBtn = document.getElementById('select-directory')
const { ipcRenderer } = require('electron')
const diff = require('deep-diff').diff;

var Tabulator = require('tabulator-tables');

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, sourcePath) => {
  var sourceFolder = scanFile.readFolderStructure(path.join(sourcePath.toString()));
  var originalFolder = fs.readFileSync(path.join(sourcePath.toString(),".meta-info.json"));
  var jsonContent = JSON.parse(originalFolder);
  var differences = diff(originalFolder, sourceFolder);

  fs.writeFile(path.join(sourcePath.toString(), '.meta-info-diff.json'), JSON.stringify(jsonContent, null, 4), (err) => {
    if (err) throw err;
});
  document.getElementById('selected-file').innerHTML = JSON.stringify(differences, null, 4);
})
