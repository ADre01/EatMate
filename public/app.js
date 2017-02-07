var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngFileUpload']);

myApp.run(function($rootScope, $cookies){
   if($cookies.get('token') && $cookies.get('currentUser')){
       $rootScope.token = $cookies.get('token');
       $rootScope.currentUser = $cookies.get('currentUser');
   } 
});


myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'views/login.html',
        controller: 'AuthController',
    }).
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController',
    }).
    when('/viewall', {
        templateUrl: 'views/landing.html',
        controller: 'LandingController'
    }).
    when('/match', {
        templateUrl: 'views/match.html',
        controller: 'LandingController'
    }).
    when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);


myApp.directive("fileread", [
  function() {
    return {
      scope: {
        fileread: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }
]);