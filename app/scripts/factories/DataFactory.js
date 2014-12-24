'use strict';

app.factory('dataFactory',['$http', 'HerokuUrl', function($http, HerokuUrl) {

  var fetchFoods = function() {
    return $http.get(HerokuUrl + 'foods.json').success(function(response) {
      return response.foods;
    });
  };

  var fetchUsers = function() {
    return $http.get(HerokuUrl + 'users.json').success(function(response) {
      return response.users;
    });
  };

  var fetchImages = function() {
    return $http.get(HerokuUrl + 'food_images.json').success(function(response) {
      return response.food_images;
    });
  };

  var fetchBookmarks = function() {
    return $http.get(HerokuUrl + 'bookmarks.json').success(function(response) {
      return response.bookmarks;
    });
  };

  return {
    fetchFoods: fetchFoods,
    fetchUsers: fetchUsers,
    fetchImages: fetchImages,
    fetchBookmarks: fetchBookmarks
  };
}]);