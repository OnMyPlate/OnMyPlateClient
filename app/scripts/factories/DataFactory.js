'use strict';

app.factory('dataFactory',['$http', 'HerokuUrl', function($http, HerokuUrl) {

  var params = {};

  var fetchFoods = function() {
    return $http.get(HerokuUrl + 'foods.json');
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

  var getConfirm = function(user_params) {
    return $http.post(HerokuUrl + 'get_confirm', user_params).success(function(response) {
      return response;
    });
  }

  var storeData = function(datam) {
    angular.copy(datam, params);
  };

  return {
    fetchFoods: fetchFoods,
    fetchUsers: fetchUsers,
    fetchImages: fetchImages,
    fetchBookmarks: fetchBookmarks,
    getConfirm: getConfirm,
    storeData: storeData,
    params: params
  };
}]);