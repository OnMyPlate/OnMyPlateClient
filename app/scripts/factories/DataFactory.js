'use strict';

app.factory('dataFactory', function($http, ServerUrl) {


  var fetchRestaurants = function() {
    return $http.get(ServerUrl + 'restaurants.json').success(function(response) {
      return response.restaurants;
    });
  };

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
    fetchRestaurants: fetchRestaurants,
    fetchFoods: fetchFoods,
    fetchUsers: fetchUsers
  };
});