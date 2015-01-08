'use strict';

app.controller('UserCtrl',['$http', '$scope', 'ServerUrl', '$location', '$window', function($http, $scope, ServerUrl, $location, $window) {


  // user can register

  $scope.registerUser = function(user) {
    var params = {user: user}
    var email_params = {username: user.username, email: user.email};
    $http.post(ServerUrl + 'email/confirm', email_params).success(function(response) {
      if(response.confirmed) {
        $http.post(ServerUrl + 'users.json', params).success(function(response) {
          // $window.sessionStorage.setItem('OnMyPlate.user', response.token);
          // Sets the headers for the request, and token for the authorization
          // $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
          // $location.path('/home');
          $location.path('/confirm')
        }).error(function(respose) {
          $location.path('/register');
        });
      }
    });
  }

}]);