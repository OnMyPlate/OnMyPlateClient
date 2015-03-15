'use strict';

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'templates/home.html'
  })
  .when('/about', {
    templateUrl: 'templates/about.html'
  })
  .when('/profile/:id', {
    templateUrl: 'templates/profile.html'
  })
  .when('/foods/:id', {
    templateUrl: 'templates/food.html'
  })
  .when('/profile/:id/add', {
    templateUrl: 'templates/add.html'
  })
  .when('/profile/:id/bookmark', {
    templateUrl: 'templates/bookmark.html'
  })
  .when('/login', {
    templateUrl: 'templates/login.html'
  })
  .when('/register', {
    templateUrl: 'templates/register.html'
  })
  .when('/profile/:id/account', {
    templateUrl: 'templates/account.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);