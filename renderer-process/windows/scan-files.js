const fs = require('fs')
const path = require('path')
const dirTree = require('directory-tree')

exports.crateMetaInfoFile = function (sourcePath) {
  const tree = dirTree(sourcePath, {
    normalizePath: true
  })
  fs.writeFile(path.join(sourcePath, '.meta-info.json'), JSON.stringify(tree, null, 4), (err) => {
    if (err) throw err
  })
}

exports.readFolderStructure = function (sourcePath) {
  return dirTree(sourcePath)
}
