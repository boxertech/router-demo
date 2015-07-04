/**
 * Created by Ken on 3/19/14.
 */
angular.module('ngRouteDemoApp').service('ModalService',['$modal','$q', function($modal,$q){
  var defaults = {
    backdrop: true,
    keyboard: true,
    modalFade: true,
    templateUrl: '/app/main/modal.html'
  };

  var options = {
    closeButtonText: 'Cancel',
    actionButtonText: 'OK',
    headerText: 'Confirm',
    bodyText: 'Perform this action?'
  };

  this.showModal = function(customDefaults, customOptions){
    if (!customDefaults) customDefaults = {};
    customDefaults.backdrop = 'static';
    return this.show(customDefaults, customOptions);
  };

  this.show = function(customDefaults, customOptions){
    var modalDefaults = {};
    var modalOptions = {};

    angular.extend(modalDefaults, defaults, customDefaults);
    if (!modalDefaults.controller){
      modalDefaults.controller = function($scope, $modalInstance){
        angular.extend(modalOptions, options, customOptions);
        $scope.modalOptions = modalOptions;
        $scope.modalOptions.ok = function(result){
          $modalInstance.close(result);
        };
        $scope.modalOptions.close = function(result){
          $modalInstance.dismiss('cancel');
        };
      }
    }

    return $modal.open(modalDefaults).result;
  };

//  this.newProjectDialog = function() {
//    //var headerText = 'Create New Project';
//    var modalOptions = {
//      actionButtonText: 'Create',
//      headerText: 'Create New Project'
//    };
//    var modalDefaults = {
//      templateUrl: '/app/main/new-project_dialog.html',
//      controller: function ($scope, $modalInstance) {
//        $scope.modalOptions = modalOptions;
//        $scope.modalOptions.ok = function (result) {
//          $modalInstance.close(result);
//        };
//        $scope.modalOptions.close = function () {
//          $modalInstance.dismiss('cancel');
//
//        };
//      }
//    };
//
//    var deferred = $q.defer();
//    this.show(modalDefaults, modalOptions).then(function(result){
//      deferred.resolve(result);
//    }, function(){
//      console.log('error(modalService.newProjectDialog):'+result);
//    });
//    return deferred.promise;
//  };
//
  this.showProjectDialog = function(isNew) {
    var customOptions = {};
    var modalOptions = {};
    if (isNew){
      customOptions = {
        actionButtonText: 'Create',
        headerText: 'Create New Project'
      };
    } else {
      customOptions = {
        actionButtonText: 'Open',
        headerText: 'Open Project'
      };
    }
    angular.extend(modalOptions, options, customOptions);
    var modalDefaults = {
      templateUrl: '/app/main/project_dialog.html',
      controller: function ($scope, $modalInstance) {
        $scope.modalOptions = modalOptions;
        $scope.modalOptions.ok = function (result) {
          $modalInstance.close(result);
        };
        $scope.modalOptions.close = function () {
          $modalInstance.dismiss('cancel');

        };
      }
    };

    var deferred = $q.defer();
    this.show(modalDefaults, modalOptions).then(function(result){
      deferred.resolve(result);
    }, function(){
      console.log('error(modalService.projectDialog('+isNew+')):'+result);
    });
    return deferred.promise;
  };

}]);

