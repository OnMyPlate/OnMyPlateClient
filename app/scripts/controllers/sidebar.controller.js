'use strict';

app.controller('SidebarCtrl', function($scope, $location){

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };

});