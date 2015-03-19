'use strict';

app.factory('foodFactory',['$location', function($location) {

  var params = {};
  var ratingsArr = [];

  var getFoodId = function(path) {
    return parseInt(path.match(/\d+$/)[0]);
  };

  var findCurrentFood = function(arr, path) {
    var foodId = getFoodId(path);
    return arr.filter(function(element) { return element.id === foodId})[0];
  };

  var storeFood = function(food) {
    angular.copy(food, params);
  };

  var calcFoodRating = function(posts) {
    var ratings = [];
    var sum = 0;
    posts.forEach(function(post) {
      sum += post.rating;
    });

    var rating = parseInt(sum / posts.length);
    

    for(var i = 0; i < rating; i++)
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