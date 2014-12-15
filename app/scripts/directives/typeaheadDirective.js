'use strict';

app.directive('typeahead',['$http', function($http) {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      model: '=',
      prompt: '@',
      name: '@',
      items: '=',
      property: '@'
    },
    templateUrl: 'templates/typeahead.html',
    link: function(scope, element, attrs) {
      scope.selected = false;
      scope.select = function(selectedModel) {
        scope.model = selectedModel;
        scope.selected = true;
      }
    } 
  };
}]); 