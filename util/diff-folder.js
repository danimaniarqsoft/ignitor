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
        context.push(addSpaces(deep, folder.name))
        if (folder.children) {
            diffFolder(folder, rightTree, context, deep)
        }
    });
    return context
}

var addSpaces = function (deep, cadena) {
    var spaces = ''
    for (let index = 0; index < deep; index++) {
        spaces = spaces + ' '
    }
    return spaces + cadena
}