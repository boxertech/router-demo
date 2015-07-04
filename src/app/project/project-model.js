
/*
  Project Model
 */

(function() {
  'use strict';
  var Project;

  Project = (function() {
    function Project(futureProjectData) {
      if (!futureProjectData.inspect) {
        _.extend(this, futureProjectData);
        return;
      }
      this.$unwrap(futureProjectData);
    }

    return Project;

  })();

  Project.$factory = [
    '$timeout', 'bxResource', function($timeout, Resource) {
      _.extend(Project, {
        $$resource: new Resource('/api/project'),
        $timeout: $timeout
      });
      return Project;
    }
  ];

  angular.module('ngRouteDemoApp').factory('bxProject', Project.$factory);

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

//# sourceMappingURL=project-model.js.map
