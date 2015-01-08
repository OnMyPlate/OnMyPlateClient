'use strict';

app.controller('SidebarCtrl',['$scope', 
                              '$location', 
                              'dataFactory', 
                              'userFactory',
                              '$q',
                              function($scope, $location, dataFactory, userFactory, $q){

  var users = [];

  dataFactory.fetchUsers().then(function(response) {
    $scope.currentUser = userFactory.defineCurrentUser(response.data.users);
  });

  $scope.isActive = function(navLocation) {
    return !!$location.path().match(navLocation)
  };

}]);