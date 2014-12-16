'use strict';

app.controller('FoodCtrl',['$location', 
                           '$scope', 
                           'dataFactory', 
                           'foodFactory',
                           'userFactory',
                           '$q', 
                           function($location, $scope, dataFactory, foodFactory, userFactory, $q) {


    var users = [];
    
    dataFactory.fetchFoods().then(function(response) {
      var foods = response.data.foods;
      var path = $location.path();
      $scope.currentFood = foodFactory.findCurrentFood(foods, path);
    });

    dataFactory.fetchUsers().then(function(response) {
      $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
        $scope.currentUser = userFactory.defineCurrentUser(users);
      });
    });

    $scope.getRating = function(post) {
      var repeat = [];
      for(var i = 0; i < post.rating; i++) {
        repeat.push(i);
      }
      return repeat;
    };

    $scope.revealForm = function() {
      $('form').slideToggle(400);
    };


}]);