'use strict';

app.controller('DashboardCtrl', ['$http', 'ServerUrl', '$scope', 'dataFactory', function($http, ServerUrl, $scope ,dataFactory) {


  dataFactory.fetchUsers().then(function(response) {
    $scope.users = response.data.users;
  });
}]);