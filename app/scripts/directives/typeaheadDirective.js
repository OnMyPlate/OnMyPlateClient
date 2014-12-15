'use strict';

app.directive('typeahead',['$http', '$timeout', function($http, $timeout) {
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
      scope.selected = true;
      scope.select = function(selectedModel) {
        scope.model = selectedModel;
        scope.selected = true;
        scope.current = 0;
      };
    } 
  };
}]); 