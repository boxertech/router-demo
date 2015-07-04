/// <reference path="../../typings/tsd.d.ts" />
angular.module('ngRouteDemoApp').controller('menuController', ['$scope', function ($scope) {

  $scope.newProjectClick = function () {
    console.log('new project click');
  };

  $scope.openProjectClick = function () {
    ModalService.showProjectDialog(false).then(function(result){
      $scope.project = result;
    });
  };

  $scope.domTreeData = [{
    label: 'TestDOMTree',
    children: [{
      label: 'First Page',
      children: [{
        label: 'First Gherkin Behavior',
        data: 'given,when,then',
        onSelect: function (branch) { alert('data:' + branch.data); }
      },
        {
          label: 'Second Gherkin Behavior',
          data: 'given, when, then 2'
        }]
    },
      {
        label: 'Second Page'
      },
      {
        label: 'Third Page',
        children: [{
          label: 'Third Gherkin Behavior',
          data: 'given,when,then 3',
          onSelect: function (branch) { alert('data:' + branch.data); }
        },
          {
            label: 'Fourth Gherkin Behavior',
            data: 'given, when, then 4'
          }]
      }]
  }]; //dom tree


//  function projectDialog(isNew) {
//    var modalInstance = $modal.open({
//      templateUrl: "/app/main/new-project_dialog.html",
//      backdrop: 'static',
//      resolve: {
//        isNew: function () {
//          return isNew;
//        }
//      },
//      controller: function ($scope, $modalInstance, isNew, $http) {
//        $scope.project = {};
//        $scope.project.isNew = isNew;
//        $scope.saveProject = function (projectName) {
//          console.log("project name: " + projectName);
//          $http.post('/project',{projectName: projectName}).then(function(response){
//            if(response.data.success){
//              mvNotifier.notify('project created!');
//            } else {
//              mvNotifier.notify('failed to create project');
//            }
//          })
//          $modalInstance.close('ok');
//
//        };
//        $scope.cancel = function () {
//          $modalInstance.dismiss('cancel');
//
//        };
//      }
//    });
//
//    modalInstance.result.then(function () {
//        //var newR = r;
//      },
//      function () {
//        $scope.canceled = true;
//      }
//    );
//
//  }

}]);
