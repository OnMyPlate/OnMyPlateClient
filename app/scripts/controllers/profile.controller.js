'use strict';

app.controller('ProfileCtrl', function($http, ServerUrl, $scope, userFactory, $q, $window) {

  var users = [];


  $http.get(ServerUrl + 'foods.json').success(function(response) {
    $scope.foods = response.foods;
  });

    $http.get(ServerUrl + 'users.json').success(function(response) {
      $q.all(createUsersArray(response.users, users)).then(function() {
        $scope.currentUser = defineCurrentUser(users);
      });
    });

  var createUsersArray = function(response, users) {
    for(var i = 0; i < response.length; i++) {
        users.push(response[i]);
    };
    return users;
  };

  var defineCurrentUser = function(users) {

    var token = userFactory.getToken();

    for(var i = 0; i < users.length; i++) {
      if(users[i].token === token) {
        return users[i];
      }
    }
  };

});