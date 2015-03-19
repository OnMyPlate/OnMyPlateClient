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
                              '$rootScope',
                              function($http, HerokuUrl, $scope, userFactory, $q, $window, dataFactory, $location, foodFactory, $rootScope) {

  var users = [];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;
    $rootScope.$watch('imageResponse', function(newVal, oldVal) {
      if(!!newVal) {
        $scope.foods[$scope.foods.length-1].posts[0].food_image = newVal;
      }
    });
    userFactory.defineCurrentUser().then(function(response) {
      $scope.currentUser = response.data.current_user;
    });
  });

  $scope.getRating = function(post) {
    var repeat = [];
    for(var i = 0; i < post.rating; i++)
      repeat.push(i);
    
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