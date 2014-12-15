'use strict';

app.directive('typeahead',['$http', function($http) {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      model: '=',
      prompt: '@',
      name: '@',
      formName: '@',
      errorMessage: '@'
    },
    templateUrl: 'templates/typeahead.html',
    link: function(scope, element, attrs) {

    }
  };
}]); 