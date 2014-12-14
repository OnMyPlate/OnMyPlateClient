'use strict';

app.controller('AddCtrl', function($scope, $http, ServerUrl, $location, $q, imageFactory) {

  $scope.ratingVals = [1, 2, 3, 4, 5]

  $scope.addReview = function(post, restaurant, image, food) {

    postRestaurant(restaurant, food, post, image);

  }; 

  var postRestaurant = function(restaurant, food, post, image) {

    var restaurant_params = {restaurant: restaurant}

    $http.post(ServerUrl + 'restaurants', restaurant_params).success(function(response) {
      $q.all(postFood(food, post, image)).then(function() {
        $location.path('/profile');
      });
    });

  };

  var postFood = function(food, post, image) {
    var food_params = {food: food};

    $http.post(ServerUrl + 'foods', food_params).success(function(response) {
      $q.all(postPost(post, image)).then(function() {
        console.log('post created!')
      });
    });
  }; 

  var postPost = function(post, image) {
    var post_params = {post: post}

    $http.post(ServerUrl + 'posts', post_params).success(function(response) {
      $q.all(imageFactory.signKey(image)).then(function() {
        console.log('nice!');
      });
    });
  };

});