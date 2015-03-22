'use strict';

app.directive('addFoodInput',[function() {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      model: '=',
      prompt: '@',
      name: '@',
      items: '=',
      property: '@',
      value: '@',
      length: '='
    },
    templateUrl: 'templates/add-food-input.html'
  };
}]); 