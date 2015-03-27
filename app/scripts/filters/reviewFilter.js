'use strict';

app.filter('ellipsis',[function(){
  return function(items) {
    return items.slice(0, 100) + '...';
  };
}]);