myApp.controller('AuthController', ['$rootScope', '$scope', '$http', '$location', '$cookies', function ($rootScope, $scope, $http, $location, $cookies) {

    //Adds user and info to database
    $scope.createUser = function () {
        if ($scope.user.password === $scope.user.passwordconfirm) {
            var user = {
                name: $scope.user.name,
                email: $scope.user.email,
                city: $scope.user.city,
                age: $scope.user.age,
                sex: $scope.user.sex,
                password: $scope.user.password
            }
            $http.post('http://localhost:3000/api/addUser', user).then(function(savedUser) {
                console.log(savedUser);
                $scope.login();
                }).catch(function (err) {
                    console.log(err);
                    if (err.data.message === 'User already exists') {
                        return $scope.emailexists = true;
                    }    
            });
        } else {
            return $scope.passwordmismatch = true;
        }

    }


    //Login 
    $scope.login = function () {
        $http.post('http://localhost:3000/api/login', {
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function (res) {
            $cookies.put('token', res.data.token);
            $cookies.put('currentUser', res.data.user[0]._id);
            $rootScope.token = res.data.token;
            $rootScope.currentUser = res.data.user[0]._id;
            console.log($rootScope.currentUser);
            console.log($rootScope.token);
            alert('Successfully signed in');
            $location.path('/viewall');
        }).catch(function (err) {
            console.log(err);
        });
    }


    //Logout
    $scope.logout = function () {
        $http.put('http://localhost:3000/api/logout', $rootScope.currentUser);
        $cookies.remove('token');
        $rootScope.token = null;
        $rootScope.currentUser = null;
        $location.path('/login');
    }
    

}]);