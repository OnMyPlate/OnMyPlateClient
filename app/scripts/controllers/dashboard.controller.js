'use strict';

app.controller('DashboardCtrl', ['$http', 'ServerUrl', '$scope', 'dataFactory', function($http, ServerUrl, $scope ,dataFactory) {


  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
  });

  $scope.deleteUser = function(user) {
    $http.delete(ServerUrl + 'users/' + user.id).success(function() {
      console.log('user deleted');
      $scope.users = $scope.users.filter(function(element) {return element.id !== user.id});
    });
  };

  $scope.deleteUserFood = function(food) {
    $http.delete(ServerUrl + 'foods/' + food.id).success(function() {
      $http.delete()
      console.log('food deleted');
    });
  };

  $scope.deleteUserPost = function(post) {
    $http.delete(ServerUrl + 'posts/' + post.id).success(function() {
      console.log('post deleted');
    });
  };
}]);