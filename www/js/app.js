var MyNamespace = MyNamespace || {};

 MyNamespace.helpers = {
   isNotString: function(str) {
     return (typeof str !== "string");
   },
   my_dump: function (v) {
      switch (typeof v) {
              case "object":
                  for (var i in v) {
                      console.log(i+":"+v[i]);
                  }
                  break;
              default: //number, string, boolean, null, undefined 
                  console.log(typeof v+":"+v);
                  break;
          }
      },//end dump


   /**
    * [cordovaCheckDir get promise from $cordovaFile.checkDir ]
    * @param  {[array]} array_path [exemple: array_path = ["./", "cordova.file.dataDirectory"];]
    * @param  {[object]} cordova [the cordova object]
    * @param  {[object]} $q [the $q.defer() object]
    * @return {[promise]} return promise from []
    */
   cordovaCheckDir: function(array_path, cordova, $q, $cordovaFile, $ionicPlatform) {
       //console.log(sys);
       var path = array_path[0];
       var syspath = array_path[1];
       var deferred = $q.defer();
       $ionicPlatform.ready(function() {
         
         console.log("cordovaCheckDir generic function");    
         console.log(syspath);
         $cordovaFile.checkDir(eval(syspath), path)
         .then(function (success) {
           console.log("in then");
           function succ(entries) {
             deferred.notify('checkin App Dir');
             deferred.resolve(entries);
                 //return(res);
               }

               function fail(error) {
                 deferred.reject(error.code);
                 //alert("Failed to list directory contents: " + error.code);
               }

             // Get a directory reader
             var directoryReader = success.createReader();

             // Get a list of all the entries in the directory
             filesList = directoryReader.readEntries(succ,fail);
             return deferred.promise;
           }, function (error) {
             filesList = error;
           });
         
       });
     return deferred.promise;
     
   },

   cordovaCheckFile: function(array_path, cordova, $q, $cordovaFile, $ionicPlatform) {
       //console.log(sys);
       var path = array_path[0];
       var syspath = array_path[1];
       var deferred = $q.defer();
       $ionicPlatform.ready(function() {
         
         console.log("cordovaCheckFile generic function");    
         console.log(syspath);
         $cordovaFile.checkFile(eval(syspath), path)
         .then(function (success) {
           console.log("in then");
           function succ(entries) {
            var fileExtRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
             deferred.notify('checkin File');
             for (i in entries) {
                var m1 = (entries[i].name).match(fileExtRegex);
                console.log("regex match", m1);
                console.log(entries[i].name);
             }
             deferred.resolve(entries);
                 //return(res);
               }

               function fail(error) {
                 deferred.reject(error.code);
                 //alert("Failed to list directory contents: " + error.code);
               }

             // Get a directory reader
             var directoryReader = success.createReader();

             // Get a list of all the entries in the directory
             filesList = directoryReader.readEntries(succ,fail);
             return deferred.promise;
           }, function (error) {
             filesList = error;
           });
         
       });
     return deferred.promise;
     
   } 
 };

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.file', {
      url: '/file',
      views: {
        'ListFiles': {
          templateUrl: 'templates/tab-file.html',
          controller: 'ListAppDirCtrl'
        }
      }
    })
  .state('file.read', {
      url: '/file/id',
      views: {
        'ReadFile': {
          templateUrl: 'templates/file.read.html',
          controller: 'ReadFileCtrl'
      }
      }
    })
  .state('tab.add', {
      url: '/add',
      views: {
        'AddFile': {
          templateUrl: 'templates/file.add.html',
          controller: 'ListDlDirCtrl'
      }
      }
    })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
