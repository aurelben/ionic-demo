angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListAppDirCtrl', function($scope, $cordovaFile, Scan) {
    $scope.filesList = Scan.all();
    
    $scope.fileRemove = function(f_id) {
      Scan.remove(f_id);
    };
})

.controller('ListDlDirCtrl', function($scope, $cordovaFile, Scan) {})

.controller('FromDlToAppCtrl', function($scope, $cordovaFile, Scan) {})

.controller('DelFileCtrl', function($scope, $cordovaFile, Scan) {})

.controller('ReadFileCtrl', function($scope, $cordovaFile, $stateParams, Scan) {})

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
});
