'use strict';

app.controller('LoginCtrl',['$scope', '$location', 'authFactory', function($scope, $location, authFactory) {

  $scope.isLoginSuccessful = true;

  $scope.login = function(params) {
    authFactory.login(params).success(function(response) {
      $location.path('/');
    }).error(function(response) {
      $location.path('/login');
      $scope.isLoginSuccessful = false;
      $('#login-error').slideDown(200);
    });
  }

}]);