/**
 * Created by Ken on 3/19/14.
 */
angular.module('ngRouteDemoApp').service('FileSystemService',['$q', '$http', function($q, $http){
  var browseUrl = 'api/file';

  this.getFileList = function(node, depth){
    var deferred = $q.defer();
    var params = "/"+encodeURIComponent(node)+"/"+encodeURIComponent(depth);
    $http({
      url: browseUrl + params,
      method: 'GET'
    })
      .success(function(data, status, headers, config){
        console.log('data: ');
        console.log(data);
        //TODO: set children to function to get children if children array not populated AND has_children = true
//        children: Array[2]
//          0: Object
//            children: Array[18]
//            isDirectory: true
//            label: "C:"
//            path: "C:"
//            __proto__: Object
//          1: Object
//            children: Array[5]
//            isDirectory: true
//            label: "D:"
//            path: "D:"
//            __proto__: Array[0]
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config){
        deferred.reject(status);
      });
    return deferred.promise;
  };

}]);

