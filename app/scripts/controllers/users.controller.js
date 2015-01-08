'use strict';

app.controller('UserCtrl',['$http',
                           '$scope',
                           'ServerUrl',
                           '$location',
                           '$window',
                           'dataFactory',
                           function($http, $scope, ServerUrl, $location, $window, dataFactory) {


  // user can register

  $scope.registerUser = function(user) {
    var params = {user: user}
    var email_params = {username: user.username, email: user.email};
    $http.post(ServerUrl + 'email/confirm', email_params).success(function(response) {
      if(response.sent) {
        $http.post(ServerUrl + 'users.json', params).success(function(response) {
          $location.path('/login')
        }).error(function(respose) {
          $location.path('/register');
        });
      }
    });
  }

}]);