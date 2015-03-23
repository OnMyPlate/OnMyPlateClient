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
                           '$rootScope',
                           function($scope, $http, HerokuUrl, $location, $q, imageFactory, dataFactory, foodFactory, userFactory, $rootScope) {

  $scope.ratingVals = [1, 2, 3, 4, 5];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });


  var clearForm = function() {
    $scope.food = {};
    $scope.post = {};
  };

  // Checks if passed object contains any property, 
  // if it is than it sets the scope.foods with that params in the form so the user can update the food
  $scope.params = foodFactory.params;
  $scope.$watch('params', function(oldVal, newVal) {
    debugger
    if(!!newVal.name) {
      $scope.food = newVal;
      $scope.post = newVal.posts[0];
    } else {
      $scope.food = {};
      $scope.post = {};
    }
  });

  $scope.upsertReview = function(post, food) {
    var image = $('input[type=file]')[0].files[0];
    upsertFood(food, post, image).then(function(){
      console.log('review successfully processed!')
      $scope.food = {};
      $scope.post = {};
    });
  };

  var upsertFood = function(food, post, image) {
    var foodParams = {food: food};

    if(food.id) {
      return $http.put(HerokuUrl + 'foods/' + food.id, foodParams).success(function(response) {
        console.log('food updated!');
        upsertPost(post, image, response).then(function() {
          userFactory.defineCurrentUser().then(function(response) {
            $scope.currentUser = response.data.current_user;
            $location.path('/profile/' + $scope.currentUser.id);
          });
        });
      });
    } else {
      return $http.post(HerokuUrl + 'foods', foodParams).success(function(response) {
        console.log('food created!');
        upsertPost(post, image, response).then(function() {
          userFactory.defineCurrentUser().then(function(response) {
            $scope.currentUser = response.data.current_user;
            $location.path('/profile/' + $scope.currentUser.id);
          });
        });
      });
    }
  }; 

  var upsertPost = function(post, image, food) {
    var postParams = {post: post};
    postParams.post.food_id = food.id;
    if(post.id) {
      return $http.put(HerokuUrl + 'posts/' + post.id, postParams).success(function() {
        console.log('post updated!');
        imageFactory.getSignKey().then(function(response) {
          var signKeyResponse = response;
          var imageParams = imageFactory.formImageParams(signKeyResponse);
          $q.all([imageFactory.postImageToS3(image, signKeyResponse), imageFactory.upsertImageToAPI(image, postParams, imageParams)]).then(function(response) {
            $rootScope.imageResponse = response[1];
          });
        });
      });
    } else {
      return $http.post(HerokuUrl + 'posts', postParams).success(function(response) {
        console.log('post created!');
        $scope.addedPostId = response.id;
        imageFactory.getSignKey().then(function(response) {
          var signKeyResponse = response;
          var imageParams = imageFactory.formImageParams(signKeyResponse);
          $q.all([imageFactory.postImageToS3(image, signKeyResponse), imageFactory.upsertImageToAPI(image, postParams, imageParams)]).then(function(response) {
            $rootScope.imageResponse = response[1];
          });
        });
      });
    }
  };

}]);