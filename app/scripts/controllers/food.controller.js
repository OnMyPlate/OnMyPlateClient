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
                           function($location, $scope, dataFactory, foodFactory, userFactory, $q, $http, HerokuUrl, imageFactory, authFactory) {


    var users = [];
    $scope.ratingVals = [1, 2, 3, 4, 5];

    dataFactory.fetchFoods().then(function(response) {
      var foods = response.data.foods;
      var path = $location.path();
      $scope.currentFood = foodFactory.findCurrentFood(foods, path);
      $scope.posts = $scope.currentFood.posts;
      foodFactory.calcFoodRating($scope.posts);
      $scope.avgFoodRating = foodFactory.ratingsArr;
    });

    dataFactory.fetchUsers().then(function(response) {
      $scope.currentUser = userFactory.defineCurrentUser(response.data.users);
      isLikedByCurrentUser($scope.posts, $scope.currentUser);
    });

    var isLikedByCurrentUser = function(posts, user) {
      posts.forEach(function(post) {
        var postLikes = user.likes
          .filter(function(like) {
            return like.user_id === user.id })
          .filter(function(element) {
            return post.id === element.post_id});
        if (postLikes.length > 0) {
          post.liked = '196baacd.glyphicons-13-heart.png';
        } else {
          post.liked = '4e59b096.glyphicons-20-heart-empty.png';
        }
      });
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

    $scope.postNewPost = function(post, image, food) {
      var postParams = {post: {
        rating: post.rating,
        review: post.review,
        food_id: food.id 
      }};

      $http.post(HerokuUrl + 'posts', postParams).success(function(response) {
        $scope.posts.push(response);
        $q.all(imageFactory.signKey(image, postParams)).then(function(response) {
          console.log('post created!');
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

    $scope.likePost = function(post) {
      var params = {like:{
        post_id: post.id
      }};
      var likedByUser = $scope.currentUser.likes.filter(function(like) {
        return like.user_id === $scope.currentUser.id
      }).filter(function(like) {return post.id === like.post_id});



      if(likedByUser.length === 0 || (post.liked === '4e59b096.glyphicons-20-heart-empty.png' && likedByUser.length > 0)) {
        $http.post(HerokuUrl + 'likes.json', params).success(function(response) {
          console.log('you like the post!!!');
          $scope.currentUser.likes.push(response);
          $scope.posts.filter(function(element) {return element.id === response.post_id })[0].likes += 1;
          $scope.posts.filter(function(post) {return response.post_id === post.id})[0].liked = '196baacd.glyphicons-13-heart.png';
        });
      } else if(post.liked === '196baacd.glyphicons-13-heart.png') {
        var likeId = $scope.currentUser.likes.filter(function(element) {return element.post_id === post.id})[0].id;
        var deletedLike = $scope.currentUser.likes.filter(function(element) {return element.post_id === post.id})[0];
        $http.delete(HerokuUrl + 'likes/' + likeId + '.json').success(function(response) {
          console.log('you unliked the post!!!');
          $scope.currentUser.likes.splice($scope.currentUser.likes.length-1, 1);
          $scope.posts.filter(function(element) {return element.id === deletedLike.post_id })[0].likes -= 1;
          $scope.posts.filter(function(post) {return post.id === deletedLike.post_id})[0].liked = '4e59b096.glyphicons-20-heart-empty.png';
        });
      }

    };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };

}]);