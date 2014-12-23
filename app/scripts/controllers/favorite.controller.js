'use strict';

app.controller('FavoriteCtrl', ['dataFactory', 
                                '$scope', 
                                '$http', 
                                'HerokuUrl',
                                'foodFactory',
                                function(dataFactory, $scope, $http, HerokuUrl ,foodFactory) {


  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods.filter(function(element) {
      return element.bookmarked === true;
    });
  });

  $scope.bookmarkFood = function(food) {
    food.bookmarked = !food.bookmarked
    if(!food.bookmarked) {
      $('.media.food').css("display", "none");
    }
    var params = {food: food};
    $http.put(HerokuUrl + 'foods/' + food.id + '.json', params).success(function(response) {
      console.log('food bookmarked!');
      $scope.foods = $scope.foods.filter(function(element) {
        return element.bookmarked === true; 
      });
    });
  }; 

  $scope.getAvgRating = function(food) {
    var posts = food.posts;

    foodFactory.calcFoodRating(posts);
    return foodFactory.ratingsArr;
  };

}]);