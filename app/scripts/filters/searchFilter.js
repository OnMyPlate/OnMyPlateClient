'use strict';

app.filter('search',[function() {
  return function(items, letter, city, state) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
    var cityMatch = new RegExp(city, 'i');
    var stateMatch = new RegExp(state, 'i');
    if(items === undefined) {
      var items = [];
    }
    for(var i = 0; i < items.length; i++) {
      var item = items[i]
      if(letterMatch.test(item.name.substring(0, 50))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
}]);