'use strict';

app.controller('HomeCtrl', ['dataFactory', 
                            '$scope', 
                            'foodFactory',
                            '$http',
                            'HerokuUrl',
                            'authFactory',
                            '$q',
                            'userFactory',
                            function(dataFactory, $scope, foodFactory, $http, HerokuUrl, authFactory, $q, userFactory) {


  var users = [];

  userFactory.defineCurrentUser().then(function(response) {
    $scope.currentUser = response.data.current_user;
  });

  $q.all([dataFactory.fetchFoods(), dataFactory.fetchBookmarks()]).then(function(response) {
    $scope.bookmarks = response[1].data.bookmarks;
    $scope.foods = response[0].data.foods;
  });

  $scope.search = {name: '', city: '', state: ''};
  $scope.filter = 'name';
  $scope.placeholder = 'Name';
  
  $scope.selectSearch = function(type) {
    $scope.filter = type;
    $scope.placeholder = type.charAt(0).toUpperCase() + type.slice(1);
  };

  $scope.getAvgRating = function(food) {
    foodFactory.calcFoodRating(food.posts);
    return foodFactory.ratingsArr;
  };

  $scope.bookmarkFood = function(food, user, bookmarks) {
    var params = {bookmark: {
      bookmarked: true,
      user_id: user.id,
      food_id: food.id
    }};

    var bookmark = bookmarks.filter(function(bookmark) { return bookmark.user_id === user.id})
                            .filter(function(bookmark) { return bookmark.food_id === food.id})[0];
    if(!!bookmark) {
      $http.delete(HerokuUrl + 'bookmarks/' + bookmark.id + '.json').success(function(response) {
        console.log('food unbookmarked!');
        $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark), 1);
      });
    } else {
      $http.post(HerokuUrl + 'bookmarks.json', params).success(function(response) {
        console.log('food bookmarked!');
        $scope.bookmarks.push(response);
      });
    }
  };

  $scope.isBookmarked = function(food, user, bookmarks) {
      var bookmark = bookmarks.filter(function(bookmark) { return bookmark.user_id === user.id})
                                     .filter(function(bookmark) { return bookmark.food_id === food.id})
                                     .filter(function(bookmark) { return bookmark.bookmarked === true})[0];

      return !!bookmark ? bookmark.bookmarked : false;
  };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };

}]);