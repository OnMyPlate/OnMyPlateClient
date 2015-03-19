'use strict';

app.controller('AccountCtrl', ['dataFactory',
                               'userFactory',
                               '$scope',
                               '$http',
                               'HerokuUrl',
                               '$location',
                               '$window',
                               function(dataFactory, userFactory, $scope, $http, HerokuUrl, $location, $window) {


  userFactory.defineCurrentUser().then(function(response) {
    $scope.currentUser = response.data.current_user;
  });

  $scope.deleteAccount = function(user) {
    $http.delete(HerokuUrl + 'users/' + user.id + '.json').success(function(response) {
      console.log('user account deleted');
      $window.sessionStorage.removeItem('OnMyPlate.user');
      $location.path('/register');
    }); 
  };

}]);