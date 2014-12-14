'use strict';

app.controller('ProfileCtrl', function($http, ServerUrl, $scope, userFactory, $q, $window) {

  var users = [];

  $http.get(ServerUrl + 'foods.json').success(function(response) {
    $scope.foods = response.foods;
  });


  $http.get(ServerUrl + 'users.json').success(function(response) {
    $q.all(userFactory.createUsersArray(response.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
    });
  });



});