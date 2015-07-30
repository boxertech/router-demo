/// <reference path="../../../typings/tsd.d.ts" />

"use strict";

angular.module('ngRouteDemoApp', ['ngRoute']);
angular.module('ngRouteDemoApp').config(function($routeProvider){
  //TODO: '$locationProvider', $locationProvider.html5Mode(true);
  $routeProvider
      .when('/', {
          controller: 'MainController',
          templateUrl: 'src/ngRoute/app/layout/main.html'
      })
      .when('/search', {
          controller: 'ListingController',
          templateUrl: 'src/ngRoute/app/layout/listing.html'
      })
      .otherwise({
          redirectTo: '/'
      });
});



