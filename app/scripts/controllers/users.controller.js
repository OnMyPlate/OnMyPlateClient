'use strict';

app.controller('UserCtrl',['$http', '$scope', 'HerokuUrl', '$location', '$window', function($http, $scope, HerokuUrl, $location, $window) {


  // user can register

  $scope.registerUser = function(user) {
    var params = {user: user}

    $http.post(HerokuUrl + 'users', params).success(function(response) {
      $window.sessionStorage.setItem('OnMyPlate.user', response.token);
      // Sets the headers for the request, and token for the authorization
      $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
      $location.path('/home');
    }).error(function(respose) {
      $location.path('/register');
    });
  }

}]);