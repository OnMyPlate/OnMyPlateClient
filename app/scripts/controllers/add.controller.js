'use strict';

app.controller('AddCtrl', ['$scope', 
                           '$http', 
                           'ServerUrl', 
                           '$location', 
                           '$q', 
                           'imageFactory', 
                           'dataFactory', 
                           function($scope, $http, ServerUrl, $location, $q, imageFactory, dataFactory) {

  $scope.ratingVals = [1, 2, 3, 4, 5]

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  $scope.upsertReview = function(post, image, food) {
    postFood(food, post, image);
  };

  var postFood = function(food, post, image) {
    var foodParams = {food: food};

    $http.post(ServerUrl + 'foods', foodParams).success(function(response) {
      $q.all(postPost(post, image)).then(function() {
        $location.path('/profile');
        console.log('post created!')
      });
    });
  }; 

  var postPost = function(post, image) {
    var postParams = {post: post}

    $http.post(ServerUrl + 'posts', postParams).success(function(response) {
      $q.all(imageFactory.signKey(image)).then(function() {
        console.log('nice!');
      });
    });
  };

}]);