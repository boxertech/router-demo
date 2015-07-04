(function() {
  'use strict';
  var Resource;

  Resource = (function() {
    function Resource($http, path) {
      _.extend(this, {
        _http: $http,
        _path: path
      });
    }

    return Resource;

  })();

  Resource.$factory = [
    '$http', function($http) {
      return function(path) {
        return new Resource($http, path);
      };
    }
  ];

  angular.module('ngRouteDemoApp').factory('bxResource', Resource.$factory);

  Resource.prototype.find = function(nodeId) {
    var deferred;
    deferred = Q.defer();
    this._http.get(this.path(nodeId)).success(deferred.resolve).error(deferred.reject);
    return deferred.promise;
  };

  Resource.prototype.path = function(nodeId) {
    if (nodeId) {
      return this._path + '/' + nodeId;
    } else {
      return this._path;
    }
  };

  Resource.prototype.set = function(nodeId, newValue) {
    var deferred, path;
    deferred = Q.defer();
    path = this._path + '/' + nodeId;
    this._http.put(path, newValue).success(deferred.resolve).error(deferred.reject);
    return deferred.promise;
  };

}).call(this);

//# sourceMappingURL=resource.js.map
