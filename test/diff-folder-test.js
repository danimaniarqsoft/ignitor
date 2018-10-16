'use strict'
// const fs = require('fs')
const dirTree = require('directory-tree');
const diff = require('../util/diff-folder').diff
const printFolder = require('../util/print-folder').printFolder
const path = require('path')

const basepath = 'resources'
var leftStrPath = path.join(__dirname, basepath, 'leftStr')
var rightStrPath = path.join(__dirname, basepath, 'rightStr')
var leftTree = dirTree(leftStrPath);
var rightTree = dirTree(rightStrPath)
var difference = diff(leftTree, rightTree)
//console.log(difference.result)
//console.log(JSON.stringify(leftTree, null, 4))
printFolder(difference.result)