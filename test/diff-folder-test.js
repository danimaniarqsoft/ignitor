'use strict'

const dirTree = require('directory-tree');
const scanFiles = require('scan-files')
const path = require('path')
const fs = require('fs')
const basepath = 'resources'

var leftStrPath = path.join(__dirname, basepath, 'repository-template.json')
var rightStrPath = path.join(__dirname, basepath, 'rightStr')
var leftTree = JSON.parse(fs.readFileSync(leftStrPath, 'utf8'));
var rightTree = dirTree(rightStrPath)

var difference = scanFiles.diff(leftTree, rightTree)

console.log(difference.result)