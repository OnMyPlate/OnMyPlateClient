'use strict';

app.factory('foodFactory',['$location', function($location) {

  var params = {};

  var getFoodId = function(path) {
    return parseInt(path.match(/\d+$/)[0]);
  };

  var findCurrentFood = function(arr, path) {
    var foodId = getFoodId(path);
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].id === foodId) {
        return arr[i];
      }
    }
  };

  var searchDuplicate = function(arr, model) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].name === model.name) {
        return arr[i];
      }
    }
  };

  var storeFood = function(food) {
    angular.copy(food, params);
  };

  return {
    findCurrentFood: findCurrentFood,
    searchDuplicate: searchDuplicate,
    storeFood: storeFood,
    params: params
  };
}]);  