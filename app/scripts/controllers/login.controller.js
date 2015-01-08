'use strict';

app.controller('LoginCtrl',['$scope', '$location', 'authFactory', 'dataFactory', function($scope, $location, authFactory, dataFactory) {

  $scope.isLoginSuccessful = true;
  $scope.login = function(params) {
    dataFactory.getConfirm().then(function(response) {
      if(response.data.confirmed) {
        authFactory.login(params).success(function(response) {
          $location.path('/');
        }).error(function(response) {
          $location.path('/login');
          $scope.isLoginSuccessful = false;
          $('#login-error').slideDown(200);
        });
      } else {
        $location.path('/login');
        $scope.isLoginSuccessful = false;
        $('#confirmation-error').slideDown(200);
      }
    });
  }

}]);