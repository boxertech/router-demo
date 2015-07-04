(function() {
  'use strict';
  angular.module('ngRouteDemoApp').controller('NodeController', [
    '$scope', 'bxNode', function($scope, Node) {
      $scope.nodes = Node.$find();
      return console.log($scope.nodes);
    }
  ]);

}).call(this);

//# sourceMappingURL=node-controller.js.map
