app.factory('userFactory', function($http, ServerUrl) {
  'use strict';

  var users =[];

  // It sends a get request to the api server. 
  // If the request is successsfuly sent, then it will receive a response which is a json object
  var fetch = function() {
    $http.get(ServerUrl + 'users').success(function(response) {

      // - If no destination is supplied, a copy of the object or array is created.
      // - If a destination is provided, all of its elements (for array) or properties (for objects) are deleted and then all elements/properties from the source are copied to it.
      // - If source is not an object or array (inc. null and undefined), source is returned.
      // - If source is identical to 'destination' an exception will be thrown.
      
      // It copies the response to users variabel which is an array. response -->> users
      angular.copy(response, users);
    })
  }

  return {
    users: users,
    fetch: fetch
  };
});