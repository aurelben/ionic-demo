var Cordohelper = Cordohelper || {};

 Cordohelper.helpers = {
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
             console.log("in cordovaCheckDir then");

               /**
                * [succ description]
                * @param  {[type]} entries [description]
                * @return {[type]}         [description]
                */
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

   /**
    * [cordovaReadFile get promise from $cordovaFile.ReadFileAsText ]
    * @param  {[array]} array_path [exemple: array_path = ["./", "cordova.file.dataDirectory"];]
    * @param  {[object]} cordova [the cordova object]
    * @param  {[object]} $q [the $q.defer() object]
    * @return {[promise]} return promise from []
    */
   cordovaReadFile: function(array_path, cordova, $q, $cordovaFile, $ionicPlatform) {
       //console.log(sys);
       var path = array_path[0];
       var syspath = array_path[1];
       var deferred = $q.defer();
       $ionicPlatform.ready(function() {

         console.log("cordovaReadFile generic function");
         console.debug(syspath);
         console.debug(path);
         console.debug($cordovaFile);
         $cordovaFile.readAsText(eval(syspath), path)
         .then(function (success) {

           console.log("in ReadFile then");
           deferred.resolve(success);
           return deferred.promise;

           /*function succ(entries) {
             deferred.notify('Reading file as text');
             deferred.resolve(entries);
                 //return(res);
           };

           function fail(error) {
             deferred.reject(error.code);
             alert("Failed to read file: " + error.code);
           };



             // create corova file reader
          var fileReader = success.createReader();

             // use reader to return promise contening file as str var
             filesList = fileReader.readEntries(succ,fail);
             return deferred.promise;*/
           }, function (error) {
             deferred.reject(error.code);
             alert("Failed to read file: " + error.code);
           });

       });
     return deferred.promise;

   },

   /**
    * [cordovaMvFile get promise from $cordovaFile.moveFile ]
    * @param  {[array]} array_path [exemple: array_path = ["./", "cordova.file.dataDirectory"];]
    * @param  {[object]} cordova [the cordova object]
    * @param  {[object]} $q [the $q.defer() object]
    * @return {[promise]} return promise from []
    */
   cordovaMvFile: function(array_path, cordova, $q, $cordovaFile, $ionicPlatform) {
       /**
        * [path is the name of file as str var]
        * @type {[str]}
        */
       var path = array_path[0];
       /**
        * [syspath is cordova actual FS]
        * @type {Object}
        */
       var syspath = array_path[1];
       /**
        * [tempsyspath is cordova file destination FS]
        * @type {Object}
        */
       var tempsyspath = array_path[2];

       $ionicPlatform.ready(function() {
         console.log("cordovaMvFile generic function");
         //var new_name = path.replace("./Dowload/","");
         $cordovaFile.moveFile(eval(syspath), "./Download/"+path, eval(tempsyspath), path)
         .then(function (success) {
           console.log("in cordovaFile.moveFile then", angular.toJson(success, true));
           return (success);
           
           }, function (error) {
             console.log(angular.toJson(error, true));
             alert("Failed to cordovaFile.moveFile promise: " + angular.toJson(error));
             return (error);
           });

       });
   },

   /**
    * [cordovaRmFile get promise from $cordovaFile.removeFile ]
    * @param  {[array]} array_path [exemple: array_path = ["./", "cordova.file.dataDirectory"];]
    * @param  {[object]} cordova [the cordova object]
    * @param  {[object]} $q [the $q.defer() object]
    * @return {[promise]} return promise from []
    */
   cordovaRmFile: function(array_path, cordova, $q, $cordovaFile, $ionicPlatform) {
       /**
        * [path is the name of file as str var]
        * @type {[str]}
        */
       var path = array_path[0];
       /**
        * [syspath is cordova actual FS]
        * @type {Object}
        */
       var syspath = array_path[1];
       /**
        * [deferred is Q object for returning promise]
        * @type {Object}
        */
       var deferred = $q.defer();

       $ionicPlatform.ready(function() {
         console.log("cordovaRmFile generic function");
         console.log(syspath);
         //console.log(tempsyspath); 
         $cordovaFile.removeFile(eval(syspath), path)
         .then(function (success) {
           console.log("in Rm file then", angular.toJson(success, true));
           return (success);
           }, function (error) {
              console.log("in Rm file error", angular.toJson(error, true));
             alert("Failed to Rm file promise: " + error.code);
             return (error);
           });

       });
   },

  /**
    * [cordovaCreateFile get promise from $cordovaFile.createFile ]
    * @param  {[array]} array_path [exemple: array_path = ["./", "cordova.file.dataDirectory"];]
    * @param  {[object]} cordova [the cordova object]
    * @param  {[object]} $q [the $q.defer() object]
    * @return {[promise]} return promise from []
    */
   cordovaCreateFile: function(array_path, cordova, $q, $cordovaFile, $ionicPlatform) {
       /**
        * [path is the name of file as str var]
        * @type {[str]}
        */
       var name = array_path[0];
       /**
        * [syspath is cordova actual FS]
        * @type {Object}
        */
       var syspath = array_path[1];
       /**
        * [deferred is Q object for returning promise]
        * @type {Object}
        */
       var deferred = $q.defer();

       $ionicPlatform.ready(function() {
         console.log("cordovaCreateFile generic methode");
         console.log(syspath);
         //console.log(tempsyspath);
         $cordovaFile.createFile(eval(syspath), name)
         .then(function (success) {
           console.log("in create file then", success);
           console.debug(success);
           self.helpers.my_dump(success);
           /*function succ(entries) {
             deferred.notify('file is created');
             deferred.resolve(entries);
                 //return(res);
               }

           function fail(error) {
              deferred.reject(error.code);
              alert("Failed to created file: " + error.code);
            }

             // create corova file reader
             var fileReader = success.createReader();

             // use reader to return promise contening file as str var
             filesList = fileReader.readEntries(succ,fail);
             return deferred.promise;*/
           }, function (error) {
             deferred.reject(error.code);
             alert("Failed to created file promise: " + error.code);
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
         $cordovaFile.checkDir(eval(syspath), path)
         .then(function (success) {
           console.log("in cordovaFile.checkFile then");
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
