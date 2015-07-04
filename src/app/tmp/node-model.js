
/*
  Node Model
 */

(function() {
  'use strict';
  var Node;

  Node = (function() {
    function Node(futureNodeData) {
      if (!futureNodeData.inspect) {
        _.extend(this, futureNodeData);
        return;
      }
      this.$unwrap(futureNodeData);
    }

    return Node;

  })();

  Node.$factory = [
    '$timeout', 'bxResource', function($timeout, Resource) {
      _.extend(Node, {
        $$resource: new Resource('/nodes'),
        $timeout: $timeout
      });
      return Node;
    }
  ];

  angular.module('ngRouteDemoApp').factory('bxNode', Node.$factory);

  Node.$find = function(nodeId) {
    var futureNodeData;
    futureNodeData = this.$$resource.find(nodeId);
    if (nodeId) {
      return new Node(futureNodeData);
    }
    return Node.$unwrapCollection(futureNodeData);
  };

  Node.prototype.$unwrap = function(futureNodeData) {
    var self;
    self = this;
    this.$futureNodeData = futureNodeData;
    return this.$futureNodedata.then(function(data) {
      return Node.$timeout(function() {
        return _.extend(self, data);
      });
    });
  };

  Node.$unwrapCollection = function(futureNodeData) {
    var collection;
    collection = {};
    collection.$futureNodeData = futureNodeData;
    futureNodeData.then(function(nodes) {
      return Node.$timeout(function() {
        return _.reduce(nodes, function(c, node) {
          c[node.id] = new Node(node);
          return c;
        }, collection);
      });
    });
    return collection;
  };

  Node.prototype.$omit = function() {
    return _.omit(this, function(value, key) {
      return _.first(key) === '$' || key === 'constructor';
    });
  };

}).call(this);

//# sourceMappingURL=node-model.js.map
