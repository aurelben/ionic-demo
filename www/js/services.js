angular.module('starter.services', [])

.factory('Scan', function($ionicPlatform, $cordovaFile) {
  // Might use a resource here that returns a JSON array
  var filesList = [{}];
  $ionicPlatform.ready(function(filesList) {
    console.log(cordova.file.dataDirectory);
    $cordovaFile.checkDir(cordova.file.dataDirectory, "./")
        .then(function (success) {
          function succ(entries, filesList) {
              var i;
              var res = [{}];
              for (i=0; i<entries.length; i++) {
                if(entries[i].isFile) {
                  res.push(entries[i]);
                  console.log("list", entries[i].name);
                  for (z in entries[i]) {
                    console.log("z is:", z, "val is:", entries[i][z]);
                  }
                }
              }
              return(res);
          }

          function fail(error) {
              alert("Failed to list directory contents: " + error.code);
          }

          // Get a directory reader
          var directoryReader = success.createReader();

          // Get a list of all the entries in the directory
          filesList = directoryReader.readEntries(succ,fail);
          
        }, function (error) {
          filesList = error;
        });
   });
  return {
    all: function() {
      return filesList;
    },
    remove: function(file) {
      filesList.splice(filesList.indexOf(file), 1);
    },
    get: function(fileId) {
      for (var i = 0; i < filesList.length; i++) {
        if (filesList[i].id === parseInt(fileId)) {
          return filesList[i];
        }
      }
      return null;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  console.log("In chat factory");
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
