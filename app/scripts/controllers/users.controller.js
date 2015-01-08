'use strict';

app.controller('UserCtrl',['$http',
                           '$scope',
                           'ServerUrl',
                           '$location',
                           '$window',
                           'dataFactory',
                           function($http, $scope, ServerUrl, $location, $window, dataFactory) {


  $scope.registerUser = function(user) {
    var params = {user: user}
    var email_params = {username: user.username, email: user.email};
    dataFactory.fetchUsers().then(function(response) {
      var existingUser = response.data.users.filter(function(element) {return element.email === user.email});
      if(!existingUser) {
        $http.post(ServerUrl + 'email/confirm', email_params).success(function(response) {
          if(response.sent) {
            $http.post(ServerUrl + 'users.json', params).success(function(response) {
              $location.path('/login')
            }).error(function(respose) {
              $location.path('/register');
            });
          }
        });
      } else {
        dataFactory.storeData({exist: true, email: user.email});
        $location.path('/login');
      }
    });
    
  }

}]);