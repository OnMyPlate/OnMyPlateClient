'use strict';

app.controller('NavbarCtrl',['$scope', 
                             '$location', 
                             'authFactory',
                             'dataFactory',
                             '$q',
                             'userFactory', 
                             function($scope, $location, authFactory, dataFactory, $q, userFactory) {

  userFactory.defineCurrentUser().then(function(response) {
    $scope.currentUser = response.data.current_user;
    $scope.encodedUserId = window.btoa($scope.currentUser.id);
  });

  
  $scope.logout = function() {
    authFactory.logout().success(function(response) {
      $('body').addClass('bg-login');
      $location.path('/login')
    });
  };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };

  $scope.toggleNavbar = function() {
    $('#collapse').stop(true, true).slideToggle(300);
  };

  $scope.changeHamburger = function() {
    $('#hamburger .line:eq(0)').toggleClass('line1');
    $('#hamburger .line:eq(1)').toggleClass('line2');
    $('#hamburger .line:eq(2)').toggleClass('line3');
  };


}]);