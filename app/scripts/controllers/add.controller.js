'use strict';

app.controller('AddCtrl', function($scope, $http, ServerUrl, $location, $q, imageFactory) {

  $scope.ratingVals = [1, 2, 3, 4, 5]

  $scope.addReview = function(post, restaurant, image, food) {

    postRestaurant(restaurant, food, post);
    
    imageFactory.signKey(image);

  }; 

  var postRestaurant = function(restaurant, food, post) {

    var restaurant_params = {restaurant: restaurant}

    $http.post(ServerUrl + 'restaurants', restaurant_params).success(function(response) {
      $q.all(postFood(food, post)).then(function() {
        $location.path('/profile');
      });
    });

  };

  var postFood = function(food, post) {
    var food_params = {food: food};

    $http.post(ServerUrl + 'foods', food_params).success(function(response) {
      postPost(post)
    });
  }; 

  var postPost = function(post) {
    var post_params = {post: post}

    $http.post(ServerUrl + 'posts', post_params).success(function(response) {
      console.log('nice');
    });
  };

});