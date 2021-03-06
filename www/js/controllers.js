angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope) {})

.controller('ListAppDirCtrl', function($scope, $cordovaFile, $ionicPlatform, Scan, $q) {
    myRes = Scan.all("./");
    var helper = Cordohelper.helpers;

    myRes.then(function (success){
      console.log(angular.toJson(success, true));
      $scope.filesList = success;
      $scope.filesList = $scope.filesList.filter(function (elem) {
      console.debug(elem.name.split(".")[1] == "his");
      return (elem.name.split(".")[1] == "his");
    });
      var helper = Cordohelper.helpers;
      //helper.my_dump($scope.filesList[0]);
    }, function(error) {
        $scope.filesList = error;
    });

    $scope.fileCreate = function (file_name) {

    }

    $scope.rmFile = function(f_id) {
      var array_path = [f_id, "cordova.file.dataDirectory"];
      var rmRes = helper.cordovaRmFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      var to_del = findObjectIndex($scope.filesList, "name", f_id);
      $scope.filesList.splice($scope.filesList.indexOf(to_del), 1);

      rmRes.then(function (success){
        console.log("rm res value", angular.toJson(success, true));
        var to_del = findObjectIndex($scope.filesList, "name", success.name);
        console.log("to del val", to_del);
        console.log("filesList val",$scope.filesList);
        $scope.filesList.splice($scope.filesList.indexOf(to_del), 1);
        console.debug(angular.toJson(success, true));
      }, function(error) {
        console.debug(angular.toJson(error, true));
        $scope.myerror = error;
      })
      console.log("log rmRes in ctrl", angular.toJson(rmRes, true));

      // if (rmRes['success']) {
      //   $scope.filesList.splice($scope.filesList.indexOf(f_id), 1);
      // } else {
      //   alert("can't remove file");
      // }
      //alert(rmRes);
      // rmRes.then(function (success){
      //   $scope.filesList.splice($scope.filesList.indexOf(f_id), 1);
      //   var helper = Cordohelper.helpers;
      // }, function(error) {
      //   $scope.myerror = error;
      // })
    };
})


.controller('ListDlDirCtrl', function($scope, $cordovaFile, $q, $ionicPlatform, Import) {
  
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

  var helper = Cordohelper.helpers;
  var array_path = ["./Download", "cordova.file.externalRootDirectory"];
  var myRes = helper.cordovaCheckDir(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
  myRes.then(function (success){
    console.debug(angular.toJson(success, true));
    $scope.filesList = success;
    $scope.filesList = $scope.filesList.filter(function (elem) {
      console.debug(elem.name.split(".")[1] == "his");
      return (elem.name.split(".")[1] == "his");
    });

    }, function(error) {
      $scope.filesList = error;
      console.debug(angular.toJson(error, true));
      //alert(error);
    })

  $scope.move = function(f_id) {
      //array_path = [file_name, "cordova.file.dataDirectory"];
      //var myRead = helper.cordovaReadFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);    
      var helper = Cordohelper.helpers;
      var array_path = [f_id, "cordova.file.externalRootDirectory", "cordova.file.dataDirectory"];
      var mvRes = helper.cordovaMvFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
      var to_del = findObjectIndex($scope.filesList, "name", f_id);
      $scope.filesList.splice($scope.filesList.indexOf(to_del), 1);
      console.log("move res value", angular.toJson(mvRes, true));
      // if(mvRes['isFile']) {
      //   var to_del = findObjectIndex($scope.filesList, "name", mvRes.name);
      //   console.log("to del", to_del);
      // }
      mvRes.then(function (success){
        console.log("move res value", angular.toJson(success, true));
        var to_del = findObjectIndex($scope.filesList, "name", success.name);
        $scope.filesList.splice($scope.filesList.indexOf(to_del), 1);
        console.debug(angular.toJson(success, true));
      }, function(error) {
        console.debug(angular.toJson(error, true));
        $scope.myerror = error;
      })
    };

})

.controller('FromDlToAppCtrl', function($scope, $cordovaFile, Scan) {
})

.controller('DelFileCtrl', function($scope, $cordovaFile, Scan) {})

.controller('ReadFileCtrl', function($scope, $cordovaFile, $stateParams,$q, $ionicPlatform, Read, $ionicLoading) {
  console.debug("in read file ctrl");
  var helper = Cordohelper.helpers;
  file_name = $stateParams.fileId;
  array_path = [file_name, "cordova.file.dataDirectory"];
  var myRes = helper.cordovaReadFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
  $ionicLoading.show({
    template: 'Chargement...'
  });

  $scope.generateGraphs = function (opt) {
    $scope.table.graphGenerator.generateGraphs(opt);
  }

  $scope.swapDirections = function (opt) {
    $scope.table.graphGenerator.swapDirections(opt);
  }

  myRes.then(function (success){
    Papa.parse(success, {
       header: true,
       dynamicTyping: true,
       skipEmptyLines: true,
       complete: function(results) {
        console.debug("in papa");
           $scope.table = new Table(results['data']);
           $scope.data_table = $scope.table.createJsonForTable();
           $ionicLoading.hide();
           delete success;
       },
       beforeFirstChunk: function (chunk) {
           chunk = chunk.split('\n').slice(1).join('\n');
           return chunk;
       }
    });
}, function(error) {
  alert(error);
});

})

.controller('AddfileCtrl', function($scope, $cordovaFile, $stateParams, Scan) {})

.controller('UploadCtrl', function($scope, $cordovaFile, $cordovaFileTransfer) {
  var directory = cordova.file.dataDirectory;
  var upfile = $scope.upfile;

  $ionicPlatform.ready(function() {

    var ready = function () {
      $cordovaFile.getFreeDiskSpace()
      .then(function (success) {
         return(success);
      }, function (error) {
          return(error);
      });
    }

    // Get free disk space in Kb
    if (ready() >= 100) {

      var url = upfile;
      var filename = url.substring(url.lastIndexOf('/')+1);
      var targetPath = directory + filename ;
      var trustHosts = true
      var options = {};

      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function(result) {
          return($scope.success = result);
        }, function(err) {
          return($scope.err = err);
        }, function (progress) {
          $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          })
        });
    };

  });
//end codova plugin use
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
