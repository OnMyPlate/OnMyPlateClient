'use strict';

app.controller('AddCtrl', ['$scope', 
                           '$http', 
                           'HerokuUrl', 
                           '$location', 
                           '$q', 
                           'imageFactory', 
                           'dataFactory',
                           'foodFactory',
                           'userFactory',
                           function($scope, $http, HerokuUrl, $location, $q, imageFactory, dataFactory, foodFactory, userFactory) {

  $scope.ratingVals = [1, 2, 3, 4, 5];
  var users = [];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  // Checks if passed object contains any property, 
  // if it is than it sets the scope.foods wiht that params in the form so the user can update the food
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
      $http.put(HerokuUrl + 'foods/' + food.id + '.json', foodParams).success(function(response) {
        console.log('food updated!');
        $q.all(upsertPost(post, image, response)).then(function() {
          dataFactory.fetchUsers().then(function(response) {
            $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
              $scope.currentUser = userFactory.defineCurrentUser(users);
              $location.path('/profile/' + $scope.currentUser.id);
            });
          });
        });
      });
    } else {
      $http.post(HerokuUrl + 'foods', foodParams).success(function(response) {
        console.log('food created!');
        $q.all(upsertPost(post, image, response)).then(function(response) {
          dataFactory.fetchUsers().then(function(response) {
            $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
              $scope.currentUser = userFactory.defineCurrentUser(users);
              $location.path('/profile/' + $scope.currentUser.id);
            });
          });
          
        });
      });
    }
  }; 

  var upsertPost = function(post, image, food) {
    var postParams = {post: {
      rating: post.rating,
      review: post.review,
      food_id: food.id 
    }};
    
    if(post.id) {
      $http.put(HerokuUrl + 'foods/' + food.id + '/posts/' + post.id, postParams).success(function(response) {
        console.log('post updated!');
        $q.all(imageFactory.signKey(image, postParams));
      });
    } else {
      $http.post(HerokuUrl + 'foods/' + food.id + '/posts', postParams).success(function(response) {
        console.log('post created!');
        $scope.addedPostId = response.id;
        $q.all(imageFactory.signKey(image, postParams));
      });
    }
  };

}]);