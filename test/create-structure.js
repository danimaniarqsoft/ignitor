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

var sourceFile = '/home/daniel/Dropbox/estructura-scm/estructura'
folderScan.crateMetaInfoFile(sourceFile)