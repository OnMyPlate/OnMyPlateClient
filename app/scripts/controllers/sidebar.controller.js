'use strict';

app.controller('SidebarCtrl',['$scope', '$location', 'authFactory', function($scope, $location, authFactory){

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };

}]);