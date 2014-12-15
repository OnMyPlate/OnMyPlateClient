'use strict';

app.controller('LoginCtrl',['$scope', '$location', 'authFactory', function($scope, $location, authFactory) {


  $scope.login = function(params) {
    authFactory.login(params).success(function(response) {
      $location.path('/')
    });
  }
}]);