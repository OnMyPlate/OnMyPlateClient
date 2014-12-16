'use strict';

app.controller('FoodCtrl',['$location', '$scope', 'dataFactory', 'foodFactory', function($location, $scope, dataFactory, foodFactory) {


    dataFactory.fetchFoods().then(function(response) {
      var foods = response.data.foods;
      var path = $location.path();
      $scope.currentFood = foodFactory.findCurrentFood(foods, path);
    });

    $scope.getRating = function(post) {
      var repeat = [];
      for(var i = 0; i < post.rating; i++) {
        repeat.push(i);
      }
      return repeat;
    };

    $scope.revealForm = function() {
      $('form').slideToggle(400);
    };
}]);