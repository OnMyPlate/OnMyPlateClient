'use strict';

app.controller('FavoriteCtrl', ['dataFactory', '$scope', function(dataFactory, $scope) {


  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods.filter(function(element) {
      return element.bookmarked === true;
    })
  }); 
}]);