'use strict';

app.factory('userFactory', function($window, $http, ServerUrl) {

  var fetch = function() {
    $http.get(ServerUrl + 'users.json').success(function(response) {
      return response.users;
    });
  };

  var getToken = function() {
    return $window.sessionStorage.getItem('OnMyPlate.user');
  };



  var defineCurrentUser = function() {
    var users = fetch();
    var token = getToken();
    for(var i = 0; i < users.length; i++) {
      if(users[i].token === token) {
        return users[i].id;
      }
    }
  };

  return {
    defineCurrentUser: defineCurrentUser
  };

});