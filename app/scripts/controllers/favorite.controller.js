'use strict';

app.controller('FavoriteCtrl', ['dataFactory', 
                                '$scope', 
                                '$http', 
                                'ServerUrl',
                                function(dataFactory, $scope, $http, ServerUrl) {


  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods.filter(function(element) {
      return element.bookmarked === true;
    });
  });

  $scope.bookmarkFood = function(food) {
    food.bookmarked = !food.bookmarked
    var params = {food: food};
    $http.put(ServerUrl + 'foods/' + food.id + '.json', params).success(function(response) {
      console.log('food bookmarked!');
      $scope.foods = $scope.foods.filter(function(element) {
        return element.bookmarked === true; 
      });
    });
  }; 
}]);