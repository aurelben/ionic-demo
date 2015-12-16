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
      return rmRes;
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
      var helper = Cordohelper.helpers;
      console.debug(dowload_dir);
      helper.my_dump(dowload_dir);

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
});

