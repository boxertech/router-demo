/// <reference path="../../../typings/tsd.d.ts" />

"use strict";

angular.module('uiRouteDemoApp', ['ui.router']);
angular.module('uiRouteDemoApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/uiRouter/app/layout/main.html'
        })
        .state('search', {
            url: '/search',
            templateUrl: 'src/uiRouter/app/layout/listing.html'
        });
}]);



