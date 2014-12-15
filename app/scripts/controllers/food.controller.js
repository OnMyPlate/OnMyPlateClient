'use strict';

app.controller('FoodCtrl',['$location', '$scope', 'dataFactory', 'foodFactory', function($location, $scope, dataFactory, foodFactory) {


    dataFactory.fetchFoods().then(function(response) {
      var foods = response.data.foods;
      var path = $location.path();
      $scope.currentFood = foodFactory.findCurrentFood(foods, path);
    });
    
}]);