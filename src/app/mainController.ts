/// <reference path="../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('mainController', ['$scope', function ($scope) {
    $scope.isTreeCollapsed = false;
    $scope.project = {name: ""};
    $scope.test = "2";

}]);
