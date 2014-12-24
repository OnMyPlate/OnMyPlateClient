'use strict';

app.controller('FavoriteCtrl', ['dataFactory', 
                                '$scope', 
                                '$http', 
                                'HerokuUrl',
                                'foodFactory',
                                '$q',
                                'userFactory',
                                function(dataFactory, $scope, $http, HerokuUrl ,foodFactory, $q, userFactory) {


  var users = [];

  // dataFactory.fetchUsers().then(function(response) {
  //   $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
  //     $scope.currentUser = userFactory.defineCurrentUser(users);
  //     $q.all(dataFactory.fetchFoods().then(function(response) {
  //       $scope.foods = response.data.foods;
  //       $q.all(dataFactory.fetchBookmarks().then(function(response) {
  //         $scope.bookmarks = response.data.bookmarks;
  //       }));
  //     }));
  //   });
  // });

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
      $q.all([dataFactory.fetchFoods(), dataFactory.fetchBookmarks()]).then(function(response) {
        $scope.bookmarks = response[1].data.bookmarks;
        $scope.foods = response[0].data.foods;
      });
    });
  });

  // dataFactory.fetchFoods().then(function(response) {
  //   $scope.foods = response.data.foods;
  //   console.log('2');
  // });

  // dataFactory.fetchBookmarks().then(function(response) {
  //   $scope.bookmarks = response.data.bookmarks;
  //   console.log('3');
  // });

  



  $scope.unBookmarkFood = function(food, user, bookmarks) {
    debugger
    $http.delete(HerokuUrl + 'bookmarks/' + bookmark.id + '.json').success(function(response) {
      console.log('food unbookmarked!');
      $scope.foods = $scope.foods.filter(function(food) {
        return food.bookmarked === true; 
      });
    });
  }; 

  $scope.isBookmarked = function(food, user, bookmarks) {
    console.log(bookmarks);
  };

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

}]);