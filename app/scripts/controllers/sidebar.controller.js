'use strict';

app.controller('SidebarCtrl',['$scope', 
                              '$location', 
                              'dataFactory', 
                              'userFactory',
                              '$q',
                              function($scope, $location, dataFactory, userFactory, $q){

  var users = [];

  userFactory.defineCurrentUser().then(function(response) {
    $scope.currentUser = response.data;
  });

  $scope.isActive = function(navLocation) {
    return !!$location.path().match(navLocation)
  };

}]);