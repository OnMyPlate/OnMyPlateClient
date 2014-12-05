'use strict';

app.controller('UserCtrl', function($http, $scope, userFactory, ServerUrl, $location) {


  // user can register

  $scope.registerUser = function(user) {
    var params = {user: user}

    $http.post(ServerUrl + 'users', params).success(function(response) {
      $location.path('/home');
    });
  }

});