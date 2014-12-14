'use strict';

app.controller('ProfileCtrl', function($http, ServerUrl, $scope) {

  $http.get(ServerUrl + 'foods.json').success(function(response) {

    $scope.foods = response.foods;
  });

});