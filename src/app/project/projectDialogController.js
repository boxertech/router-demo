/**
* Created by Ken on 3/16/14.
*/
angular.module('ngRouteDemoApp').controller('projectDialogController', ['$scope', 'FileSystemService', '$q', function ($scope, FileSystemService, $q) {

//  $scope.options = {
//    context: {
//      myKey: 'myValue'
//    },
//    onSelect: function ($event, node, context){
//      if ($event.crtlKey){
//        context.myKey = 'newValue';
//      } else {
//        show(context.myKey);
//      }
//    }
//  };

  $scope.init = function(){
    if (!$scope.model || Object.keys($scope.model).length === 0){
      //TODO: Need to uncomment top and bottom code associated with FileSystem Service and write tests
      //TODO: FileSystemService currently does not run and will cause dialog to break when uncommented.
      $scope.model = {label:"no file listing"};
      $scope.getNextFileLevel('root',2).then(function(fileNodes){
        _parseData(fileNodes);
        $scope.model = fileNodes.children;
      });
    }
  }

  $scope.getNextFileLevel = function(root, depth){
    var deferred = $q.defer();
    console.log('calling getNextFileLevel for root: '+root);
    FileSystemService.getFileList(root,2).then(function(fileNodes){
      //  console.log(fileNodes);
      deferred.resolve(fileNodes);
//        $scope.model = [
//          {label:'c:', path: 'c:', isDirectory: true, children:[
//            {label:'file 1', path: 'c:/file 1', isDirectory: false},
//            {label:'dir 1', path: 'c:/dir 1', isDirectory: true}
//          ]},
//          {label:'d:', path: 'c:', isDirectory: true, children: [
//            {label:'file 2', path: 'd:/file 2', isDirectory: false}
//          ]}
//        ];
      //},function(error){
      //  console.log("FielSystemService ERROR: "+error);
    });

    return deferred.promise;
  }

  $scope.init();

  $scope.model = [
    {label:'parent1', children:[
      {label:'child1'}, {label:'child2'}
    ]},
    {label:'parent2', children: [{label:'child'}]}
  ];

  $scope.context = {};

  function _parseData(data){
    if (data.children && data.children.length > 0){
      data.children.forEach(function(child, index, array){
        _parseData(child);
      });
    }

    if (data.has_children){
      if (!data.children){
        //console.log('setting function for path: '+data.path);
        data.children = function(){
          $scope.getNextFileLevel(data.path,2).then(function(fileNodes){
            _parseData(fileNodes);
            console.log('_parsedata for path: '+data.path);
            console.log(data);
            console.log(fileNodes);
            return fileNodes.children;
          });
        }
      }
    }
  }



}]);
