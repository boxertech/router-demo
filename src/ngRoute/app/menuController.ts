/// <reference path="../../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('MenuController', ['$location', function ($location) {

  var vm = this;
  vm.search = function(searchTerm) {
      $location.path('/search').search('term', searchTerm);
  };

}]);
