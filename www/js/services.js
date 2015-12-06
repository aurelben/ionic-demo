angular.module('starter.services', [])

.factory('Scan', function($ionicPlatform, $cordovaFile, $q) {
  // Might use a resource here that returns a JSON array
  
  var helper = Cordohelper.helpers;
  return {
    all: function(path) {
      array_path = [path, "cordova.file.dataDirectory"];
      var myRes = helper.cordovaCheckDir(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      return myRes;
    },
    remove: function(file) {
      array_path = [file, "cordova.file.dataDirectory"];
      var rmRes = helper.cordovaRmFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      return rnRes;
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

.factory('Read', function($ionicPlatform, $cordovaFile, $q) {
  // Might use a resource here that returns a JSON array
  var helper = Cordohelper.helpers;
  return {
    all: function(path) {
      array_path = [path, "cordova.file.dataDirectory"];
      var myRes = helper.cordovaReadFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      return myRes;
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

.factory('Import', function($ionicPlatform, $cordovaFile, $q) {
  // Might use a resource here that returns a JSON array
  var helper = Cordohelper.helpers;
    return {
    all: function(path) {
      array_path = [path, "cordova.file.externalRootDirectory"];
      var myRes = helper.cordovaCheckDir(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      return myRes;
    },
    remove: function(file, dowload_dir) {
      array_path = [file, "cordova.file.externalRootDirectory", "cordova.file.dataDirectory"];
      var mvRes = helper.cordovaMvFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      return mvRes;
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

