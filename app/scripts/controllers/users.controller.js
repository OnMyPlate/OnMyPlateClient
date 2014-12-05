'use strict';

app.controller('UserCtrl', function($http, $scope, userFactory, ServerUrl) {


  // user can register

  $scope.registerUser = function(user) {
    var params = {user: user}

    $http.post(ServerUrl + 'users', params).success(function(response) {
      debugger
      console.log(response)
    });
  }

});