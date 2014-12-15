'use strict';

app.factory('foodFactory',['$location', function($location) {


  var getFoodId = function(path) {
    return parseInt(path.substr(path.length - 1));
  };

  var findCurrentFood = function(arr, path) {
    var foodId = getFoodId(path);
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].id === foodId) {
        return arr[i];
      }
    }
  };

  var searchDuplicate = function(arr, food) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].name === food.name) {
        return true;
      }
    }
  };

  return {
    findCurrentFood: findCurrentFood
  };
}]);  