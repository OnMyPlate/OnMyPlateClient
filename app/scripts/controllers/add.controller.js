'user strict';

app.controller('AddCtrl', function($scope, $http, ServerUrl, $location) {

  $scope.ratingVals = [1, 2, 3, 4, 5]

  $scope.addPost = function(post) {
      var params = {post: post}
      debugger
      $http.post(ServerUrl + 'posts', params).success(function(response) {
        $location.path('/profile');
      });
  };

});