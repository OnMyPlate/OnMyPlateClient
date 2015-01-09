'use strict';

app.controller('LoginCtrl',['$scope', 
                            '$location', 
                            'authFactory', 
                            'dataFactory', 
                            '$window',
                            '$http',
                             function($scope, $location, authFactory, dataFactory, $window, $http) {

  $scope.isLoginSuccessful = true;
  $scope.isConfirmed = true;
  $scope.doesExist = true;

  if(dataFactory.params.exist) {
    $scope.existingUserEmail = dataFactory.params.email;
    $scope.doesExist = false;
    $('#existing-error').slideDown(200);
    $('#existing-error').delay(3000).slideUp(200);
  };

  $scope.login = function(params) {
    dataFactory.fetchUsers().then(function(response) {
      var doesUserExist = response.data.users.filter(function(user) {return user.email === params.email})[0];
      if(!!doesUserExist) {
        dataFactory.getConfirm().then(function(response) {
          if(response.data.confirmed || !!$scope.emailConfirmedByUserOnce) {
            $scope.emailConfirmedByUserOnce = true;
            authFactory.login(params).success(function(response) {
              $window.sessionStorage.setItem('OnMyPlate.user', response.token);
              // Sets the headers for the request, and token for the authorization
              $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
              $location.path('/');
            }).error(function(response) {
              $scope.params = {};
              $scope.isLoginSuccessful = false;
              $('#login-error').slideDown(200);
              $('#login-error').delay(3000).slideUp(200);
            });
          } else {
            $location.path('/login');
            $scope.isConfirmed = false;
            $('#confirmation-error').slideDown(200);
            $('#confirmation-error').delay(3000).slideUp(200);
          }
        });
      } else {
        $scope.params = {};
        $scope.isLoginSuccessful = false;
        $('#login-error').slideDown(200);
        $('#login-error').delay(3000).slideUp(200);
      }
    });
    
  }

}]);