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
      property: '@',
      value: '@'
    },
    templateUrl: 'templates/typeahead.html',
    link: function(scope, element, attrs) {
      scope.currentIndex = 0;
       scope.selected = true;
      scope.select = function(selectedModel) {
        scope.model = selectedModel;
        scope.selected = true;
        scope.currentIndex = 0;
      };

      scope.isCurrent = function(index) {
        return scope.currentIndex === index;
      };

      scope.checkKeys = function(event) {
        if(event.keyCode === 40) {
          event.preventDefault();
          if(scope.currentIndex + 1 !== scope.items.length) {
            scope.currentIndex += 1;
          }
        } else if(event.keyCode === 38) {
          event.preventDefault();
          if(scope.currentIndex !== 0) {
            scope.currentIndex -= 1;
          }
        }
      }
    } 
  };
}]); 