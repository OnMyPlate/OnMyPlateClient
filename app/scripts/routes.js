app.config(function($routeProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  });
});