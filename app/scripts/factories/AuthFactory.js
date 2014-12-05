'use strict';

app.factory('authFactory', function($http, $window, ServerUrl) {

  var login = function(params) {
    return $http.post(ServerUrl + 'login', params).success(function(response) {
      // sessionStorage.setItem('key', 'value'), sets session in the browser
      $window.sessionStorage.setItem('OnMyPlate.user', response.token);

      // Sets the headers for the request, and token for the authorization
      $http.defaults.headers.common.Authorization = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
    }); 
  };

  var logout = function() {
    return $http.get(ServerUrl + '/logout').sucess(function(response) {
      // removes the session from web browser 
      $window.sessionStorage.removeItem('OnMyPlate.user');
    });
  };

  var isAuthenticated = function() {
    // !! forces the value to be boolean
    // if the session set/user is logged in, then it will return true, otherwise it will return false
    return !!$window.sessionStorage.setItem('OnMyPlate.user');
  };

});