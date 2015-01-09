'use strict';

app.factory('authFactory',['$http', '$window', 'HerokuUrl', '$location', function($http, $window, HerokuUrl, $location) {

  var login = function(params) {
    return $http.post(HerokuUrl + 'login', params).success(function(response) {
      // sessionStorage.setItem('key', 'value'), sets session in the browser
      $window.sessionStorage.setItem('OnMyPlate.user', response.token);
      // Sets the headers for the request, and token for the authorization
      $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
    }).error(function(response) {
      $location.path('/login');
    }); 
  };

  var logout = function() {
    return $http.get(HerokuUrl + 'logout').success(function(response) {
      // removes the OnMyPlate.user from the $window.sessionStorage object 
      $window.sessionStorage.removeItem('OnMyPlate.user');
    });
  };

  var isAuthenticated = function() {
    // !! forces the value to be boolean
    // if the session get/user is logged in, then it will return true, otherwise it will return false
    return !!$window.sessionStorage.getItem('OnMyPlate.user');
  };

  var isAdmin = function(user) {
    return $http.post(HerokuUrl + 'admin', user);
  };


  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin
  };

}]);