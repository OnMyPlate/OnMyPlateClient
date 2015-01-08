'use strict';

app.controller('SidebarCtrl',['$scope', 
                              '$location', 
                              'dataFactory', 
                              'userFactory',
                              '$q',
                              function($scope, $location, dataFactory, userFactory, $q){

  $scope.isActive = function(navLocation) {
    return navLocation === $location.path();
  };

  var users = [];

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
    });
  });

}]);