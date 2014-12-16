'use strict';

app.controller('AddCtrl', ['$scope', 
                           '$http', 
                           'ServerUrl', 
                           '$location', 
                           '$q', 
                           'imageFactory', 
                           'dataFactory',
                           'foodFactory',
                           function($scope, $http, ServerUrl, $location, $q, imageFactory, dataFactory, foodFactory) {

  $scope.ratingVals = [1, 2, 3, 4, 5]

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  $scope.upsertReview = function(post, image, food) {
    upsertFood(food, post, image);
  };

  var upsertFood = function(food, post, image) {
    var foodParams = {food: food};
    var paramsFromAnotherMother = foodFactory.params;
    debugger
    $http.post(ServerUrl + 'foods', foodParams).success(function(response) {
      $q.all(upsertPost(post, image, food)).then(function() {
        $location.path('/profile');
        console.log('post created!')
      });
    });
  }; 

  var upsertPost = function(post, image, food) {
    var postParams = {post: post}

    $http.post(ServerUrl + 'foods/' + food.id + '/posts', postParams).success(function(response) {
      $q.all(imageFactory.signKey(image)).then(function() {
        console.log('nice!');
      });
    });
  };

}]);