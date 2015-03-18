'use strict';

app.factory('userFactory',['$window', '$http', 'HerokuUrl', function($window, $http, HerokuUrl) {

  var defineCurrentUser = function(users) {
    var token = getToken();
    return $http.post(HerokuUrl + 'current_user', {token: token});
  };


  var getToken = function() {
    return $window.sessionStorage.getItem('OnMyPlate.user');
  };

  var doesExist = function(params) {
    return $http.post(HerokuUrl + 'does_exist', params);
  }

  return {
    defineCurrentUser: defineCurrentUser,
    doesExist: doesExist
  };

}]);