app.config(function($routeProvider) {
  'use strict';

  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/about', {
    templateUrl: 'templates/about.html'
  })
  .when('/profile', {
    templateUrl: 'templates/profile.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});