var DirectoryStructureJSON = require('directory-structure-json');
var basepath = '/home/daniel/Dropbox/estructura-scm/estructura';
var fs = require('fs'); // you can select any filesystem as long as it implements the same functions that native fs uses.
 
DirectoryStructureJSON.getStructure(fs, basepath, function (err, structure, total) {
    if (err) console.log(err);
    fs.writeFile('/home/daniel/Dropbox/estructura-scm/estructura/.meta-info.json', JSON.stringify(structure, null, 4), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
});

DirectoryStructureJSON.traverseStructure(structure, basepath,
    function (folder, path) {
        console.log('folder found: ', folder.name, 'at path: ', path);
    },
    function (file, path) {
        console.log('file found: ', file.name, 'at path: ', path);
    });