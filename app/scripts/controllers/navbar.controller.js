'use strict';

app.controller('NavbarCtrl',['$scope', '$location', 'authFactory', function($scope, $location, authFactory) {

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };

  $scope.logout = function() {
    authFactory.logout().success(function(response) {
      $location.path('/login')
    });
  };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };


}]);