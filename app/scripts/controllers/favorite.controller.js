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

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
      $q.all([dataFactory.fetchFoods(), dataFactory.fetchBookmarks()]).then(function(response) {
        $scope.bookmarks = response[1].data.bookmarks;
        $scope.foods = response[0].data.foods;
      });
    });
  });

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
    var bookmark = bookmarks.filter(function(bookmark) { return bookmark.user_id === user.id})
                            .filter(function(bookmark) { return bookmark.food_id === food.id})
                            .filter(function(bookmark) { return bookmark.bookmarked === true});
    return bookmark[0].bookmarked;
  };

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

}]);