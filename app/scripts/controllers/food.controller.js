'use strict';

app.controller('FoodCtrl',['$location', 
                           '$scope', 
                           'dataFactory', 
                           'foodFactory',
                           'userFactory',
                           '$q',
                           '$http',
                           'HerokuUrl',
                           'imageFactory',
                           'authFactory',
                           '$rootScope', 
                           function($location, $scope, dataFactory, foodFactory, userFactory, $q, $http, HerokuUrl, imageFactory, authFactory, $rootScope) {


    var users = [];
    $scope.ratingVals = [1, 2, 3, 4, 5];

    dataFactory.fetchFoods().then(function(response) {
      var foods = response.data.foods;
      var path = $location.path();
      $scope.currentFood = foodFactory.findCurrentFood(foods, path);
      $scope.posts = $scope.currentFood.posts;
      foodFactory.calcFoodRating($scope.posts);
      $scope.avgFoodRating = foodFactory.ratingsArr;
      userFactory.defineCurrentUser().then(function(response) {
        $scope.currentUser = response.data.current_user;
        $scope.userLikes = response.data.likes;
        isLikedByCurrentUser($scope.posts, $scope.currentUser, $scope.userLikes);
      });
      $rootScope.$watch('postImageResponse', function(newVal, oldVal) {
        if(!!newVal) {
          $scope.posts[$scope.posts.length-1].food_image = newVal;
        }
      });
    });

    var isLikedByCurrentUser = function(posts, user, userLikes) {
      if(!!userLikes) {
        posts.forEach(function(post) {
          var postLikes = userLikes
            .filter(function(like) {
              return like.user_id === user.id })
            .filter(function(like) {
              return post.id === like.post_id});
          if (postLikes.length > 0) {
            post.liked = '196baacd.196baacd.glyphicons-13-heart.png';
          } else {
            post.liked = '4e59b096.glyphicons-20-heart-empty.png';
          }
        });
      } else {
        posts.forEach(function(post) {
          post.liked = '4e59b096.glyphicons-20-heart-empty.png';
        });
      }
    };

    $scope.getRating = function(post) {
      var repeat = [];
      for(var i = 0; i < post.rating; i++) {
        repeat.push(i);
      }
      return repeat;
    };

    $scope.slideToggleForm = function() {
      $('form').slideToggle(400);
    };

    $scope.hideForm = function() {
      $('form').hide(400);
    };

    $scope.postNewPost = function(post, food) {
      var image = $('input[type=file]')[0].files[0];
      var postParams = {post: post};
      postParams.post.food_id = food.id;

      $http.post(HerokuUrl + 'posts', postParams).success(function(response) {
        $scope.posts.push(response);
        console.log('post created!')
        imageFactory.getSignKey().then(function(response) {
          var signKeyResponse = response;
          var imageParams = imageFactory.formImageParams(signKeyResponse);
          $q.all([imageFactory.postImageToS3(image, signKeyResponse), imageFactory.upsertImageToAPI(image, postParams, imageParams)]).then(function(response) {
            $rootScope.postImageResponse = response[1];
          });
        });
      });
    };

    $scope.removePost = function(post, food) {
      if(food.posts.length === 1) {
        $http.delete(HerokuUrl + '/foods/' + food.id + '.json').success(function(response) {
          $location.path('/');
        });
      } else {
        $http.delete(HerokuUrl + 'posts/' + post.id).success(function(response) {
          $('#' + post.id).fadeOut(300, function() {
            $scope.posts.splice($scope.posts.indexOf(post), 1);
          });          
          console.log('post is deleted!');
        });
      } 
    };

    $scope.likePost = function(post, user, userLikes) {
      var params = {like: {post_id: post.id, user_id: user.id}};

      if(!!userLikes) {
        var likedByUser = userLikes.filter(function(like) {
          return like.user_id === user.id
        }).filter(function(like) {return post.id === like.post_id});
      } else {
        var likedByUser = [];
      }
      if(likedByUser.length === 0 || (post.liked === '4e59b096.glyphicons-20-heart-empty.png' && likedByUser.length > 0)) {
        $http.post(HerokuUrl + 'likes.json', params).success(function(response) {
          console.log('you like the post!!!');
          userLikes.push(response);
          $scope.posts.filter(function(post) {return post.id === response.post_id })[0].likes += 1;
          $scope.posts.filter(function(post) {return response.post_id === post.id})[0].liked = '196baacd.glyphicons-13-heart.png';
        });
      } else if(post.liked === '196baacd.glyphicons-13-heart.png') {
        var likeId = userLikes.filter(function(like) {return like.post_id === post.id})[0].id;
        var deletedLike = userLikes.filter(function(like) {return like.post_id === post.id})[0];
        $http.delete(HerokuUrl + 'likes/' + likeId + '.json').success(function(response) {
          console.log('you unliked the post!!!');
          userLikes.splice(userLikes.length-1, 1);
          $scope.posts.filter(function(post) {return post.id === deletedLike.post_id })[0].likes -= 1;
          $scope.posts.filter(function(post) {return post.id === deletedLike.post_id})[0].liked = '4e59b096.glyphicons-20-heart-empty.png';
        });
      }

    };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };

}]);