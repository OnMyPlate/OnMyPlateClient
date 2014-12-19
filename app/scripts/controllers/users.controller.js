'use strict';

app.controller('UserCtrl',['$http', '$scope', 'herokuUrl', '$location', '$window', function($http, $scope, herokuUrl, $location, $window) {


  // user can register

  $scope.registerUser = function(user) {
    var params = {user: user}

    $http.post(herokuUrl + 'users', params).success(function(response) {
      $window.sessionStorage.setItem('OnMyPlate.user', response.token);
      // Sets the headers for the request, and token for the authorization
      $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
      $location.path('/home');
    }).error(function(respose) {
      $location.path('/register');
    });
  }

}]);