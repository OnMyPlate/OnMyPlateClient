'use strict';

app.controller('NavbarCtrl',['$scope', 
                             '$location', 
                             'authFactory',
                             'dataFactory',
                             '$q',
                             'userFactory', 
                             function($scope, $location, authFactory, dataFactory, $q, userFactory) {


  var users = [];

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
    });
  });

  $(document).ready(function() {
    $('#hamburger').on('click', function() {
      $('#hamburger .line:eq(0)').toggleClass('line1', 500);
      $('#hamburger .line:eq(1)').toggleClass('line2');
      $('#hamburger .line:eq(2)').toggleClass('line3', 500);
    });
  });

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

  $scope.toggleNavbar = function() {
    $('#collapse').stop(true, true).slideToggle(300);
  };


}]);