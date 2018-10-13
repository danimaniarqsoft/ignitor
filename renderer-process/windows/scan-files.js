const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

exports.saveStructure = function (sourcePath) {
    const tree = dirTree(sourcePath);
    console.log(JSON.stringify(tree, null, 4));
    fs.writeFile(path.join(sourcePath, '.meta-info.json'), JSON.stringify(tree, null, 4), (err) => {
        if (err) throw err;
    });
}

exports.readFolderStructure = function (sourcePath) {
    return dirTree(sourcePath);
}


