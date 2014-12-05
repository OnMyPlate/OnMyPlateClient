app.factory('AuthFactory', function($http, $window, ServerUrl) {

  'use strict';

  var login = function(params) {
    return $http.post(ServerUrl + 'login', params).success(function(response) {
      // sessionStorage.setItem('key', 'value')
      $window.sessionStorage.setItem('OnMyPlate.user', response.token);

      // Sets the headers for the request
      $http.defaults.headers.common.Authorization = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
    }); 
  };

  var logout = function() {
    return $http.get(ServerUrl + '/logout').sucess(function(response) {
      $window.sessionStorage.removeItem('OnMyPlate.user');
    });
  };

});