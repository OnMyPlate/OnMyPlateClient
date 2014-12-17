'use strict';

app.controller('HomeCtrl', ['dataFactory', 
                            '$scope', 
                            'foodFactory',
                            '$http',
                            'ServerUrl', 
                            function(dataFactory, $scope, foodFactory, $http, ServerUrl) {

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

  $scope.bookmarkFood = function(food) {
    food.bookmarked = !food.bookmarked
    var params = {food: food};
    $http.put(ServerUrl + 'foods/' + food.id + '.json', params).success(function(response) {
      console.log('food bookmarked!');
    });
  };



}]);