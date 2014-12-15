'use strict';

app.factory('dataFactory', function($http, ServerUrl) {

  var fetchFoods = function() {
    return $http.get(ServerUrl + 'foods.json').success(function(response) {
      return response.foods;
    });
  };

  var fetchUsers = function() {
    return $http.get(ServerUrl + 'users.json').success(function(response) {
      return response.users;
    });
  };

  return {
    fetchFoods: fetchFoods,
    fetchUsers: fetchUsers
  };
});