/**
 * Created by Ken on 3/19/14.
 */
angular.module('ngRouteDemoApp').service('ProjectService',['$q', '$http', function($q, $http){
  var addUrl = 'api/project';
  var openUrl = 'api/project';

  this.addProject = function(project){
    var deferred = $q.defer();
    $http({
      url: addUrl,
      method: 'POST',
      data: project
    })
      .success(function(data, status, headers, config){
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config){
        var i = 1;
      });
    return deferred.promise;
  };

  this.openProject = function(project){
    var deferred = $q.defer();
    $http({
      url: openUrl + '/' + project._id,
      method: 'GET'
    }).success(function(data, status, headers, config){
        deferred.resolve(data);
      });
    return deferred.promise;
  };

}]);

