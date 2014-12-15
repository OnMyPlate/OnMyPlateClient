'use strict';

app.controller('HomeCtrl', ['dataFactory', '$scope', function(dataFactory, $scope) {

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

}]);