'use strict';

app.controller('DashboardCtrl', ['$http', 
                                 'HerokuUrl',
                                 '$scope',
                                 'dataFactory',
                                 'userFactory',
                                 'authFactory',
                                 function($http, HerokuUrl, $scope ,dataFactory, userFactory, authFactory) {


  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
    $scope.currentUser = userFactory.defineCurrentUser(response.data.users);
    authFactory.isAdmin($scope.currentUser).then(function(response) {
      if(!response.admin) {
        $location.path('/');
      }
    });
  });

  $scope.deleteUser = function(user) {
    $http.delete(HerokuUrl + 'users/' + user.id).success(function() {
      console.log('user deleted');
      $scope.users = $scope.users.filter(function(element) {return element.id !== user.id});
    });
  };

  $scope.deleteUserFood = function(food) {
    $http.delete(HerokuUrl + 'foods/' + food.id).success(function() {
      $http.delete()
      console.log('food deleted');
    });
  };

  $scope.deleteUserPost = function(post) {
    $http.delete(HerokuUrl + 'posts/' + post.id).success(function() {
      console.log('post deleted');
    });
  };
}]);