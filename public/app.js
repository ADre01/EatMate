var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.run(['$rootScope', function($rootScope){
    
}]);


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
    otherwise({
        redirectTo: '/'
    });
}]);