'use strict';

app.controller('SidebarCtrl',['$scope', 
                              '$location', 
                              'dataFactory', 
                              'userFactory',
                              '$q',
                              function($scope, $location, dataFactory, userFactory, $q){

  var users = [];

  userFactory.defineCurrentUser().then(function(response) {
    $scope.currentUser = response.data.current_user;
    $scope.encodedUserId = window.btoa($scope.currentUser.id);
  });

  $scope.isActive = function(navLocation) {
    return !!$location.path().match(navLocation)
  };

}]);