'use strict';

app.factory('userFactory',['$window', '$http', 'HerokuUrl', function($window, $http, HerokuUrl) {

  var defineCurrentUser = function(users) {

    var token = getToken();
    return users.filter(function(user) { return user.token === token})[0];
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