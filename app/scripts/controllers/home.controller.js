'use strict';

app.controller('HomeCtrl', ['dataFactory', '$scope', 'foodFactory', function(dataFactory, $scope, foodFactory) {

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };



}]);