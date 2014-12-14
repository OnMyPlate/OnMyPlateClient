'use strict';

app.directive('fileread', function() {
  return {
    scope: {
      fileread: '='
    },

    link: function(scope, element, attrs) {
      element.bind("change", function(e) {
        scope.$apply(function() {
          scope.fileread = e.target.files[0];
        });
      });
    }
  };
});