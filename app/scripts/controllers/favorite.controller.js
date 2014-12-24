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
    });
  });

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods.filter(function(food) {
      return food.bookmarked === true;
    })
    .filter(function(food) {return food.user_bookmarked === $scope.currentUser.id});
  });

  $scope.unBookmarkFood = function(food) {
    food.bookmarked = !food.bookmarked;
    food.user_bookmarked = null;
    var params = {food: food};
    $http.put(HerokuUrl + 'foods/' + food.id + '.json', params).success(function(response) {
      console.log('food unbookmarked!');
      $scope.foods = $scope.foods.filter(function(food) {
        return food.bookmarked === true; 
      });
    });
  }; 

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

}]);