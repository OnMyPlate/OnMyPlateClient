'use strict';

app.controller('BookmarkCtrl', ['dataFactory', 
                                '$scope', 
                                '$http', 
                                'HerokuUrl',
                                'foodFactory',
                                '$q',
                                'userFactory',
                                function(dataFactory, $scope, $http, HerokuUrl ,foodFactory, $q, userFactory) {


  var users = [];

  userFactory.defineCurrentUser().then(function(response) {
    $scope.currentUser = response.data.current_user;
    $q.all([dataFactory.fetchFoods(), dataFactory.fetchBookmarks()]).then(function(response) {
      $scope.bookmarks = response[1].data.bookmarks;
      $scope.foods = response[0].data.foods;
    });
  });

  $scope.unBookmarkFood = function(food, user, bookmarks) {
    var bookmark = bookmarks.filter(function(bookmark) { return bookmark.user_id === user.id})
                            .filter(function(bookmark) { return bookmark.food_id === food.id});
    $http.delete(HerokuUrl + 'bookmarks/' + bookmark[0].id + '.json').success(function(response) {
      console.log('food unbookmarked!');
      $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark), 1);
    });
  }; 

  $scope.isBookmarked = function(food, user, bookmarks) {

    var bookmark = bookmarks.filter(function(bookmark) { return bookmark.user_id === user.id})
                            .filter(function(bookmark) { return bookmark.food_id === food.id})
                            .filter(function(bookmark) { return bookmark.bookmarked === true});
    if(bookmark[0] !== undefined) {
      return bookmark[0].bookmarked;
    } else {
      return false;
    }
  };

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

}]);