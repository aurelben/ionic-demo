angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListAppDirCtrl', function($scope, $cordovaFile, $ionicPlatform, Scan, $q) {
    myRes = Scan.all("./");
    var helper = Cordohelper.helpers;
    /*var randnbr = Math.floor((Math.random() * 10) + 1);
    array_path = ["testfile_"+randnbr+".txt", "cordova.file.dataDirectory"];
    var cretest = helper.cordovaCreateFile(array_path, cordova, $q, $cordovaFile, $ionicPlatform);
    cretest.then(function (success){
      alert(success);
    }, function (error){
      alert(error);
    });*/
    
    myRes.then(function (success){
      console.log(angular.toJson(success, true));
      $scope.filesList = success;
      var helper = Cordohelper.helpers;
      //helper.my_dump($scope.filesList[0]);
    }, function(error) {
        $scope.filesList = error;
    });

    $scope.fileCreate = function (file_name) {

    }
   
    $scope.fileRemove = function(f_id) {
      rmRes = Scan.remove(f_id);
      rmRes.then(function (success){
        $scope.filesList.splice($scope.filesList.indexOf(f_id), 1);
        var helper = Cordohelper.helpers;
        //helper.my_dump($scope.filesList);
      }, function(error) {
        $scope.myerror = error;
      })
    };
})


.controller('ListDlDirCtrl', function($scope, $cordovaFile, Import) {
  myRes = Import.all("./Download");
  myRes.then(function (success){
    console.log(angular.toJson(success, true));
    $scope.filesList = success;
/*    var helper = Cordohelper.helpers;
    helper.my_dump(success);
*/
    $scope.move = function(f_id, success) {
      var helper = Cordohelper.helpers;
      mvRes = Import.remove(f_id, success);
      mvRes.then(function (success){
        $scope.filesList.splice(scope.filesList.indexOf(f_id), 1);
        var helper = Cordohelper.helpers;
        helper.my_dump($scope.filesList);
      }, function(error) {
        $scope.myerror = error;
      })
    };


    var helper = Cordohelper.helpers;
    helper.my_dump($scope.filesList);
    }, function(error) {
      $scope.filesList = error;
    })    
  
})

.controller('FromDlToAppCtrl', function($scope, $cordovaFile, Scan) {
})

.controller('DelFileCtrl', function($scope, $cordovaFile, Scan) {})

.controller('ReadFileCtrl', function($scope, $cordovaFile, $stateParams, Read) {
  console.debug("in read file ctrl");
  file_name = $stateParams.fileId;
  myRes = Read.all(file_name);
  console.debug($stateParams.fileId);
  console.debug(angular.toJson(myRes, true));
  parse_his_txt(myRes);

  $scope.generateGraphs = function (opt) {
    table.graphGenerator.generateGraphs(generateGraphs);
  }

  $scope.swapDirections = function (opt) {
    table.graphGenerator.swapDirections(opt);
  }



  myRes.then(function (success){
    $scope.fileAsText = success;
    var helper = Cordohelper.helpers;
    helper.my_dump($scope.fileAsText);
    }, function(error) {
      $scope.filesList = error;
    })

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
});
