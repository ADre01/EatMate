myApp.controller('SettingsController', ['$rootScope', '$scope', '$location', '$http', 'Upload', function ($rootScope, $scope, $location, $http, Upload) {
    
  $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };    
    
    
  $scope.upload = function(file) {
        Upload.upload({
            url: 'http://localhost:3000/api/uploadImage',
            method: 'POST',
            file: file
        }).then(function (resp) {
            console.log(resp);
        }).catch(function(err){
            console.log(err);
        });
    };
    
    

}]);