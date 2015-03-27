'use strict';

app.filter('fellipsis',[function(){
  return function(items) {
    return items.slice(0, 20) + '...';
  };
}]);