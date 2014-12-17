'use strict';

app.factory('foodFactory',['$location', function($location) {

  var params = {};
  var ratingsArr = [];

  var getFoodId = function(path) {
    return parseInt(path.match(/\d+$/)[0]);
  };

  var findCurrentFood = function(arr, path) {
    var foodId = getFoodId(path);
    return (arr.filter(function(element) { return element.id === foodId})[0]);
  };

  var searchDuplicate = function(arr, model) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].name === model.name) {
        return arr[i];
      }
    }
  };

  var storeFood = function(food) {
    angular.copy(food, params);
  };

  var calcFoodRating = function(posts) {
    var ratings = [];
    var sum = 0;
    for(var i = 0; i < posts.length; i++) {
      sum += posts[i].rating;
    }

    var rating = parseInt(sum / posts.length);
    
    for(var i = 0; i < rating; i++) {
      ratings.push(i);
    }
    angular.copy(ratings, ratingsArr)
    
  };

  return {
    findCurrentFood: findCurrentFood,
    searchDuplicate: searchDuplicate,
    storeFood: storeFood,
    params: params,
    calcFoodRating: calcFoodRating,
    ratingsArr: ratingsArr
  };
}]);  