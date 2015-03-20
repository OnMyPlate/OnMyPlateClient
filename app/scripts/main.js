'use strict';

var app = angular.module('OnMyPlate', ['ngRoute']);
/*

Run blocks are the closest thing in Angular to the main method. 
A run block is the code which needs to run to kickstart the application.
It is executed after all of the service have been configured and the injector has been created. 
Run blocks typically contain code which is hard to unit-test, 
  and for this reason should be declared in isolated modules, 
  so that they can be ignored in the unit-tests.

*/

app.constant('HerokuUrl', 'http://localhost:3000/')
// app.constant('HerokuUrl', 'http://onmyplate.herokuapp.com/')
   .constant('AmazonS3', 'https://ompimages.s3.amazonaws.com/');

app.run(['$rootScope', '$location', '$http', '$window', 'authFactory', function($rootScope, $location, $http, $window, authFactory) {
  // Every application has a single root scope. All other scopes are descendant scopes of the root scope
  $rootScope.$on('$routeChangeStart', function(event, next) {
    if(authFactory.isAuthenticated()) {
      $('body').removeClass('bg-login');
      $('body').removeClass('bg-reg');
      $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('OnMyPlate.user');

    } else if($location.path() ===  '/') {
      $('body').removeClass('bg-login');
      $('body').removeClass('bg-reg');
      $location.path('/');
    } else if($location.path() === '/register') {
      $('body').removeClass('bg-login');
      $('body').addClass('bg-reg');
      $location.path('/register');
    } else if($location.path() === '/about') {
      $('body').removeClass('bg-login');
      $('body').removeClass('bg-reg');
      $location.path('/about');
    } else {
      $('body').removeClass('bg-reg');
      $('body').addClass('bg-login');
      $location.path('/login');
    }
  });
}]);
