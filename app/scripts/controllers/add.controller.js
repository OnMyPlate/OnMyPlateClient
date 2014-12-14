'use strict';

app.controller('AddCtrl', function($scope, $http, ServerUrl, $location, $q, imageFactory, $upload) {

  $scope.ratingVals = [1, 2, 3, 4, 5]
  
  $scope.addPost = function(post, restaurant, image, food) {
    var promises= [];
    var post_params = {post: post}
    var restaurant_params = {restaurant: restaurant}
    var food_params = {food: food}
    debugger
    $http.post(ServerUrl + 'restaurants', restaurant_params).success(function(response) {
      console.log(response);
    }, 2000);

    $http.post(ServerUrl + 'foods', food_params).success(function(response) {
      console.log(response);
    }, 2000);

    $http.post(ServerUrl + 'posts', post_params).success(function(response) {
      console.log(response);
    }, 2000);



    promises.push(imageFactory.signKey(image));
  }; 

});