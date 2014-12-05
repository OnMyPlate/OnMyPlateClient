app.factory('AuthFactory', function($http, $window, ServerUrl) {

  'use strict';

  var login = function(params) {
    return $http.post(ServerUrl + 'login', params).success(function(response) {
      // sessionStorage.setItem('key', 'value')
      $window.sessionStorage.setItem('OnMyPlate.user', response.token);
      $http.defaults.headers.common['Autherization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');
    }); 
  };

});