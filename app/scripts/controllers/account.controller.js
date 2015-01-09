'use strict';

app.controller('AccountCtrl', ['dataFactory',
                               'userFactory',
                               '$scope',
                               '$http',
                               'ServerUrl',
                               '$location',
                               '$window',
                               function(dataFactory, userFactory, $scope, $http, ServerUrl, $location, $window) {


  dataFactory.fetchUsers().then(function(response) {
      $scope.currentUser = userFactory.defineCurrentUser(response.data.users);
  });

  $scope.deleteAccount = function(user) {
    $http.delete(ServerUrl + 'users/' + user.id + '.json').success(function(response) {
      console.log('user account deleted');
      $window.sessionStorage.removeItem('OnMyPlate.user');
      $location.path('/register');
    }); 
  };

}]);