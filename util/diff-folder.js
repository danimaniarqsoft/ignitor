const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

exports.diff = function (leftTree, rightTree, context) {
    var context = []
    var deep = -4;
    return diffFolder(leftTree, context, deep)
}

var addSpaces = function (spaceNumber, cadena) {
    var spaces = ''
    for (let index = 0; index < spaceNumber; index++) {
        spaces = spaces + ' '
    }
    return spaces + cadena
}
var diffFolder = function (leftTree, lister, spaceNumber) {
    spaceNumber = spaceNumber + 4;
    leftTree.children.forEach(folder => {
        lister.push(addSpaces(spaceNumber, folder.name))
        if (folder.children) {
            diffFolder(folder, lister, spaceNumber)
        }
    });
    return lister
}
