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

  // Checks if passed object contains any property, if it is than it sets the scope.foods wiht that params in the form so the user can update the food
  (function() {
    var params = foodFactory.params;
    if(params.name) {
      $scope.food = params;
      $scope.post = params.posts[0];
    }
  })();
  

  $scope.upsertReview = function(post, image, food) {
    upsertFood(food, post, image);
  };

  var upsertFood = function(food, post, image) {
    var foodParams = {food: food};

    if(food.id) {
      $http.put(ServerUrl + 'foods/' + food.id + '.json', foodParams).success(function(response) {
        console.log('food updated!');
        $q.all(upsertPost(post, image, food)).then(function() {
          $location.path('/profile');
        });
      });
    } else {
      $http.post(ServerUrl + 'foods', foodParams).success(function(response) {
        console.log('post created!');
        $q.all(upsertPost(post, image, food)).then(function() {
          $location.path('/profile');
        });
      });
    }
  }; 

  var upsertPost = function(post, image, food) {
    var postParams = {post: post}

    if(post.id) {
      $http.put(ServerUrl + 'foods/' + food.id + '/posts/' + post.id, postParams).success(function(response) {
        console.log('post updated!');
        $q.all(imageFactory.signKey(image, postParams));
      });
    } else {
      $http.post(ServerUrl + 'foods/' + food.id + '/posts', postParams).success(function(response) {
        console.log('post updated!');
        $q.all(imageFactory.signKey(image, postParams));
      });
    }
  };

}]);