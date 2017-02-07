myApp.controller('SettingsController', ['$rootScope', '$scope', '$location', '$http', 'Upload', function ($rootScope, $scope, $location, $http, Upload) {
    
 $scope.initProfile = function(){
     $http.get('http://localhost:3000/api/profile/'+$rootScope.currentUser).then(function(user){
         $scope.userdata = user.data;
     }).catch(function(err){
         console.log(err);
     });
 }   
     

 $scope.updateProfile = function(){
     $http.post('http://localhost:3000/api/updateProfile/'+$rootScope.currentUser, $scope.userdata).then(function(updatedUser){
         $scope.userdata = updatedUser.data;
     }).catch(function(err){
         console.log(err);
     });
 }
 
 
 
 
 //Watches for profile image uploads and automatically uploads and updates
 $scope.$watch(function(){
     return $scope.file;
 }, function(){
     $scope.submit();
 });
 
 
  $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };    
    
    
  $scope.upload = function(file) {
        Upload.upload({
            url: 'http://localhost:3000/api/saveSettings/'+$rootScope.currentUser._id,
            method: 'POST', 
            file: file
        }).then(function (resp) {
            $scope.profile = resp.data;
            $scope.initProfile();
            console.log(resp.data);
        }).catch(function(err){
            console.log(err);
        });
    };
    
    

}]);