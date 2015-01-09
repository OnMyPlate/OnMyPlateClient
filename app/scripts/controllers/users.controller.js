'use strict';

app.controller('UserCtrl',['$http',
                           '$scope',
                           'HerokuUrl',
                           '$location',
                           '$window',
                           'dataFactory',
                           '$route',
                           function($http, $scope, HerokuUrl, $location, $window, dataFactory, $route) {


  $scope.doesPasswordsMatch = true;
  $scope.nonExist = true;
  $scope.isActed = false;

  $scope.registerUser = function(user) {
    $scope.isActed = true;
    $('#loader').css('width', '100%');
    var params = {user: user}
    var email_params = {username: user.username, email: user.email};
    if(user.password === user.password_confirmation) {
      dataFactory.fetchUsers().then(function(response) {
        var existingUser = response.data.users.filter(function(element) {return element.email === user.email})[0];
        if(!existingUser) {
          $http.post(HerokuUrl + 'email/confirm', email_params).success(function(response) {
            if(response.sent) {
              $http.post(HerokuUrl + 'users.json', params).success(function(response) {
                $scope.isActed = false;
                dataFactory.storeData({registered: true});
                $location.path('/login')
              }).error(function(respose) {
                $scope.isActed = false;
                $location.path('/register');
              });
            }
          });
        } else {
          $scope.isActed = false;
          dataFactory.storeData({exist: true, email: user.email});
          $location.path('/login');
        }
      });
    } else {
      $scope.isActed = false;
      $scope.user = {};
      $scope.doesPasswordsMatch = false;
      $('#password-error').slideDown(200);
      $('#password-error').delay(3000).slideUp(200);
      $location.path('/register');
    }
  }

}]);