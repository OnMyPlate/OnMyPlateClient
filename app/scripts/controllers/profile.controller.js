'use strict';

app.controller('ProfileCtrl',['$http', 
                              'ServerUrl', 
                              '$scope', 
                              'userFactory', 
                              '$q', 
                              '$window', 
                              'dataFactory',
                              '$location',
                              'foodFactory', 
                              function($http, ServerUrl, $scope, userFactory, $q, $window, dataFactory, $location, foodFactory) {

  var users = [];

  dataFactory.fetchFoods().then(function(response) {
    $scope.foods = response.data.foods;

  });

  dataFactory.fetchUsers().then(function(response) {
    $q.all(userFactory.createUsersArray(response.data.users, users)).then(function() {
      $scope.currentUser = userFactory.defineCurrentUser(users);
    });
  });

  $scope.goToEdit = function(food) {
    foodFactory.storeFood(food);
    $location.path('/add');
  };  

  $scope.removeFood = function(food) {
    $http.delete(ServerUrl + '/foods/' + food.id).success(function(response) {
      console.log('food is deleted!')
      $('.' + food.id).fadeOut(400);
    });
  };

}]);