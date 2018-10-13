const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');
const tab = 4;

exports.diff = function (leftTree, rightTree) {
    var context = []
    var deep = - tab
    return diffFolder(leftTree, rightTree, context, deep)
}

var diffFolder = function (leftTree, rightTree, context, deep) {
    deep = deep + tab;
    leftTree.children.forEach(folder => {
        leftTree = folder
        leftTree.isPresent = folderIsInArray(folder, rightTree.children)
        context.push(addSpaces(deep, folder.name))
        if (folder.children) {
            diffFolder(leftTree, rightTree, context, deep)
        }
    });
    return context
}

var folderIsInArray = function (currentFolder, children) {
    var isPresent = false
    children.forEach(testFolder => {
        if (currentFolder.name.toString() === testFolder.name.toString()) {
            console.log('->' + currentFolder.name + ', ' + testFolder.name)
            isPresent = true;
        }
    });
    return false
}

var addSpaces = function (deep, cadena) {
    var spaces = ''
    for (let index = 0; index < deep; index++) {
        spaces = spaces + ' '
    }
    return spaces + cadena
}