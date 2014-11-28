app.controller('NavbarCtrl', function($scope, $location) {

  'use strict';

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };
});