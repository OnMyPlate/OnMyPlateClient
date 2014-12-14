'use strict';

app.factory('userFactory', function($window, $http, ServerUrl) {

  var createUsersArray = function(response, users) {
    for(var i = 0; i < response.length; i++) {
        users.push(response[i]);
    };
    return users;
  };

  var defineCurrentUser = function(users) {

    var token = getToken();

    for(var i = 0; i < users.length; i++) {
      if(users[i].token === token) {
        return users[i];
      }
    }
  };


  var getToken = function() {
    return $window.sessionStorage.getItem('OnMyPlate.user');
  };

  return {
    createUsersArray: createUsersArray,
    defineCurrentUser: defineCurrentUser
  };

});