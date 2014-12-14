'use strict';

app.factory('userFactory', function($window, $http, ServerUrl) {



  var getToken = function() {
    return $window.sessionStorage.getItem('OnMyPlate.user');
  };

  return {
    getToken: getToken
  };

});