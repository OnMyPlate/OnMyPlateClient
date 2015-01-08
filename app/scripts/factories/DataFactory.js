'use strict';

app.factory('dataFactory',['$http', 'ServerUrl', function($http, ServerUrl) {

  var params = {};

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

  var fetchImages = function() {
    return $http.get(ServerUrl + 'food_images.json').success(function(response) {
      return response.food_images;
    });
  };

  var fetchBookmarks = function() {
    return $http.get(ServerUrl + 'bookmarks.json').success(function(response) {
      return response.bookmarks;
    });
  };

  var getConfirm = function() {
    return $http.get(ServerUrl + 'get_confirm').success(function(response) {
      return response;
    });
  }

  return {
    fetchFoods: fetchFoods,
    fetchUsers: fetchUsers,
    fetchImages: fetchImages,
    fetchBookmarks: fetchBookmarks,
    getConfirm: getConfirm
  };
}]);