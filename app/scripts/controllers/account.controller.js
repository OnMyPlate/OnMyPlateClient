'use strict';

app.controller('AccountCtrl', ['dataFactory',
                               'userFactory',
                               '$scope',
                               '$http',
                               'ServerUrl',
                               '$location',
                               function(dataFactory, userFactory, $scope, $http, ServerUrl, $location) {


  dataFactory.fetchUsers().then(function(response) {
      $scope.currentUser = userFactory.defineCurrentUser(response.data.users);
  });

  $scope.deleteAccount = function(user) {
    $http.delete(ServerUrl + 'users/' + user.id + '.json').success(function(response) {
      console.log('user account deleted');
      $location.path('/register');
    }); 
  };

}]);