'use strict';

app.controller('ProfileCtrl', function($http, ServerUrl, $scope, userFactory, $q, $window, dataFactory) {

  var users = [];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  dataFactory.fetchRestaurants().then(function(response) {
    $scope.restaurants = response.data.restaurants;
  });

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
    });
  });

  $scope.checkRestaurant = function(food, restaurants) {
    var restaurants = restaurants;
    for(var i = 0; i < restaurants.length; i++) {
      if(restaurants[i].id === food.restaurant_id) {
        return restaurants[i].name;
      }
    }
  };

});