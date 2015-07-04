/// <reference path="../../typings/tsd.d.ts" />
"use strict";
angular.module('ngRouteDemoApp', ['ngRoute']);
angular.module('ngRouteDemoApp').config(function ($routeProvider) {
    //TODO: '$locationProvider', $locationProvider.html5Mode(true);
    $routeProvider.when('/', { templateUrl: 'app/layout/main.html', controller: 'mainController' });
});
//# sourceMappingURL=app.js.map