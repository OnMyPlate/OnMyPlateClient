'use strict';

app.controller('NavbarCtrl', function($scope, $location) {

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };
});