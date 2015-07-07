/// <reference path="../../typings/tsd.d.ts" />
"use strict";
angular.module('ngRouteDemoApp', ['ngRoute']);
angular.module('ngRouteDemoApp').config(function ($routeProvider) {
    //TODO: '$locationProvider', $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        controller: 'mainController',
        templateUrl: 'app/layout/main.html'
    }).when('/search', {
        controller: 'listingController',
        templateUrl: 'app/layout/listing.html'
    }).otherwise({
        redirectTo: '/'
    });
});
//# sourceMappingURL=app.js.map