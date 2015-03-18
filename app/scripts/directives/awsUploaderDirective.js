'use strict';

app.directive('awsUploader', [function() {
  return {
    restrict: 'EA',
    scope: {
      key: '@',
      policy: '@',
      accessKey: '@',
      signature: '@',
      model: '='
    },
    templateUrl: 'templates/aws-uploader.html'
  };
}]);