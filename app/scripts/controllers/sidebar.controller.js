'use strict';

app.controller('SidebarCtrl', function($scope, $location, authFactory){

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };

});