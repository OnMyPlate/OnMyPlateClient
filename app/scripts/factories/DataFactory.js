'use strict';

app.factory('dataFactory',['$http', 'herokuUrl', function($http, herokuUrl) {

  var fetchFoods = function() {
    return $http.get(herokuUrl + 'foods.json').success(function(response) {
      return response.foods;
    });
  };

  var fetchUsers = function() {
    return $http.get(herokuUrl + 'users.json').success(function(response) {
      return response.users;
    });
  };

  var fetchImages = function() {
    return $http.get(herokuUrl + 'food_images.json').success(function(response) {
      return response.food_images;
    });
  };

  return {
    fetchFoods: fetchFoods,
    fetchUsers: fetchUsers,
    fetchImages: fetchImages
  };
}]);