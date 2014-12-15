'use strict';

app.controller('ProfileCtrl', function($http, ServerUrl, $scope, userFactory, $q, $window, dataFactory) {

  var users = [];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
    });
  });

});