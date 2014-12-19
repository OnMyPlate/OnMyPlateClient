'use strict';

app.controller('HomeCtrl', ['dataFactory', 
                            '$scope', 
                            'foodFactory',
                            '$http',
                            'herokuUrl',
                            'authFactory',
                            function(dataFactory, $scope, foodFactory, $http, herokuUrl, authFactory) {

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  // $scope.searchOptions = ['Name', 'City', 'State'];
  // $scope.selection = $scope.searchOptions[0];

  // $scope.selectSearch = function(option) {
  //   $scope.selection = option;
  // };

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

  $scope.bookmarkFood = function(food) {
    food.bookmarked = !food.bookmarked
    var params = {food: food};
    $http.put(herokuUrl + 'foods/' + food.id + '.json', params).success(function(response) {
      console.log('food bookmarked!');
    });
  };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };



}]);