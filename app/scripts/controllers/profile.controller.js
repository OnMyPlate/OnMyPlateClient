'use strict';

app.controller('ProfileCtrl',['$http', 
                              'HerokuUrl', 
                              '$scope', 
                              'userFactory', 
                              '$q', 
                              '$window', 
                              'dataFactory',
                              '$location',
                              'foodFactory', 
                              function($http, HerokuUrl, $scope, userFactory, $q, $window, dataFactory, $location, foodFactory) {

  var users = [];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
    dataFactory.fetchUsers().then(function(response) {
      $scope.currentUser = userFactory.defineCurrentUser(response.data.users);
    });
  });

  $scope.getRating = function(post) {
    var repeat = [];
    for(var i = 0; i < post.rating; i++) {
      repeat.push(i);
    }
    return repeat;
  };

  $scope.goToEdit = function(food) {
    foodFactory.storeFood(food);
    $location.path('/profile/food.user_id/add');
  };  

  $scope.removeFood = function(food) {
    $http.delete(HerokuUrl + 'foods/' + food.id).success(function(response) {
      console.log('food is deleted!')
      $('#' + food.id).fadeOut(300, function() {
        $scope.foods.splice($scope.foods.indexOf(food), 1);
      });
    });
  };

}]);