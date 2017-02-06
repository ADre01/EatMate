myApp.controller('LandingController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.findMatch = function () {
        $http.post('http://localhost:3000/api/match', $scope.user).then(function (matches) {
                $scope.matches = matches.data;
            console.log($scope.matches);
                $scope.matchFind = true;

        }).catch(function (err) {
            console.log(err);
        });
    }

}]);