'use strict'
const fs = require('fs');
var basepath = '/home/daniel/Dropbox/estructura-scm/estructura';
const folderScan = require('../renderer-process/windows/scan-files');
const path = require('path');
var structure = folderScan.readFolderStructure(path.join(basepath));
console.log(JSON.stringify(structure, null, 4));
fs.writeFile(path.join(basepath, '.meta-info.json'), JSON.stringify(structure, null, 4), (err) => {
    if (err) throw err;
});