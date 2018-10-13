const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');
const tab = 4;

exports.diff = function (leftTree, rightTree) {
    var context = {}
    context.info = []
    deep = - tab
    return diffFolder(leftTree, rightTree, context, deep)
}

var diffFolder = function (leftTree, rightTree, context, deep) {
    deep = deep + tab;
    leftTree.children.forEach(currentLeftFile => {
        var rightFileFinded = getFileInRightFolder(currentLeftFile, rightTree.children)
        context.info.push(addSpaces(deep, currentLeftFile.name))
        if (rightFileFinded) {
            currentLeftFile.isPresent = true
            if (currentLeftFile.type == 'directory') {
                diffFolder(currentLeftFile, rightFileFinded, context, deep)
            }
        } else {
            currentLeftFile.isPresent = false
        }
    });
    return context
}

var getFileInRightFolder = function (currentFolder, children) {
    var element = null
    children.forEach(testFolder => {
        if (currentFolder.name.toString() === testFolder.name.toString()) {
            element = testFolder
        }
    })
    return element
}

var addSpaces = function (deep, cadena) {
    var spaces = ''
    for (let index = 0; index < deep; index++) {
        spaces = spaces + ' '
    }
    return spaces + cadena
}