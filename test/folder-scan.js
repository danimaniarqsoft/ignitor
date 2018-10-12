'use strict'
// const fs = require('fs')
var basepath = 'resources'
const folderScan = require('../renderer-process/windows/scan-files')
const path = require('path')
const leftStrPath = path.join(__dirname, basepath, 'leftStr')
const rightStrPath = path.join(__dirname, basepath, 'rightStr')
const leftStr = folderScan.readFolderStructure(leftStrPath)
const righttStr = folderScan.readFolderStructure(rightStrPath)
const observableDiff = require('deep-diff').observableDiff
const applyChange = require('deep-diff').applyChange

observableDiff(leftStr, righttStr, function (d) {
    if (d.path[d.path.length - 1] !== 'path') {
        console.log('<<<<<<<<<<<<<<')
        console.log(d.lhs)
        console.log('>>>>>>>>>>>>>>')
        console.log(d.rhs)
        //applyChange(lhs, rhs, d);
    }
});