'use strict';

app.controller('HomeCtrl', ['dataFactory', 
                            '$scope', 
                            'foodFactory',
                            '$http',
                            'HerokuUrl',
                            'authFactory',
                            function(dataFactory, $scope, foodFactory, $http, HerokuUrl, authFactory) {

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
  });

  $scope.search = {name: '', city: '', state: ''};
  $scope.filter = 'name';
  $scope.placeholder = 'Name';

  $scope.selectSearch = function(type) {
    $scope.filter = type;
    $scope.placeholder = type.charAt(0).toUpperCase() + type.slice(1);
  };

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

  $scope.bookmarkFood = function(food) {
    food.bookmarked = !food.bookmarked
    var params = {food: food};
    $http.put(HerokuUrl + 'foods/' + food.id + '.json', params).success(function(response) {
      console.log('food bookmarked!');
    });
  };

  $scope.isLoggedIn = function() {
    return authFactory.isAuthenticated();
  };



}]);