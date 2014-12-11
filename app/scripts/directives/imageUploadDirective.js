'use strict';

app.directive('fileread', function() {
  return {
    scope: {
      fileread: '='
    },

    link: function(scope, element, attrs) {
      element.bind("change", function(e) {
        var reader = new FileReader();
        scope.$apply(function() {
          scope.fileread = e.target.files[0];
        });
      });
    }
  };
});