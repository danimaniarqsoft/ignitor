const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');
const tab = 4;

exports.printFolder = function (leftTree, rightTree) {
    var context = {}
    context.info = []
    deep = - tab
    printTreeElements(leftTree, context, deep)
}

var printTreeElements = function (tree, context, deep) {
    deep = deep + tab;
    tree.children.forEach(currentFile => {
        if (currentFile.isPresent === false || !currentFile.isPresent) {
            console.log(addSpaces(deep, currentFile.name))
        }
        if (currentFile.children) {
            printTreeElements(currentFile, context, deep)
        }
    });
}

var addSpaces = function (deep, cadena) {
    var spaces = ''
    for (let index = 0; index < deep; index++) {
        spaces = spaces + ' '
    }
    return spaces + cadena
}
