'use strict';

app.factory('foodFactory',['$location', function($location) {

  var params = {}, ratingsArr = [];

  var getFoodId = function(path) {
    return parseInt(path.match(/\d+$/)[0]);
  };

  var findCurrentFood = function(foods, path) {
    var foodId = getFoodId(path);
    return foods.filter(function(food) { return food.id === foodId})[0];
  };

  var storeFood = function(food) {
    angular.copy(food, params);
  };

  var calcFoodRating = function(posts) {
    var ratings = [], sum = 0, i, rating;

    posts.forEach(function(post) {
      sum += post.rating;
    });

    rating = parseInt(sum / posts.length);
    

    for(i = 0; i < rating; i++)
      ratings.push(i);
    
    angular.copy(ratings, ratingsArr)
    
  };

  return {
    findCurrentFood: findCurrentFood,
    storeFood: storeFood,
    params: params,
    calcFoodRating: calcFoodRating,
    ratingsArr: ratingsArr
  };
}]);  