'use strict';

app.controller('LoginCtrl', function($scope, $location, authFactory) {


  $scope.login = function(params) {
    authFactory.login(params).success(function(response) {
      $location.path('/home')
    })
  }
});