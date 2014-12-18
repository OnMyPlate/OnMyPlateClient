'use strict';

app.filter('search',[function() {
  return function(items, letter) {
    var filtered = [];
    var letterMatch = new RegExp(letter, 'i');
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