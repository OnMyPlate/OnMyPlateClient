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
  .when('/post', {
    templateUrl: 'templates/post.html'
  })
  .when('/add', {
    templateUrl: 'templates/add.html'
  })
  .when('/favorites', {
    templateUrl: 'templates/favorites.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});