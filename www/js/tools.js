function findObjectIndex(objectsList, property, value) {
    for (var i = 0; i < objectsList.length; i++) {
        if (objectsList[i][property] === value) {
            return i;
        }
    }
}

function getFileDate(fileStr) {
    return fileStr.split('\n')[2].split("\t")[0].split(" ")[0];
}
