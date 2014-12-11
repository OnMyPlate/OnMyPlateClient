'use strict';

app.controller('AddCtrl', function($scope, $http, ServerUrl, $location, $q) {

  $scope.ratingVals = [1, 2, 3, 4, 5]

  $scope.addPost = function(post, restaurant, image, food) {
    var post_params = {post: post}
    var restaurant_params = {restaurant: restaurant}
    var image_params = {image: image}
    var food_params = {food: food}

    $http.post(ServerUrl + 'restaurants', restaurant_params).success(function(response) {
      console.log(response);
    });
    $http.post(ServerUrl + 'posts', post_params).success(function(response) {
      console.log(response);
    });


  };

});