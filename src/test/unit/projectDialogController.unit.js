describe('ProjectDialogController ', function() {
  var scope,
    menuCtrl,
    mockFileSystemService,
    mockProjectService,
    deferred,
    projectDeferred;

  var fileRoot = {label: 'root', path:'',};
  //var projectGoodResult = {status: true, message: ''};
  var fileTree = {
    label: 'root',
    path:'',
    isDirectory: true,
    children: [
      {
        label:'c:',
        path: 'c:',
        isDirectory: true,
        children:[
          {
            label:'file 1',
            path: 'c:/file 1',
            isDirectory: false
          },
          {
            label:'dir 1',
            path: 'c:/dir 1',
            isDirectory: true
          }
        ]
      },
      {
        label:'d:',
        path: 'c:',
        isDirectory: true,
        children: [
          {
            label:'file 2',
            path: 'd:/file 2',
            isDirectory: false
          }
        ]
      }
    ]
  };

  beforeEach(module('ngRouteDemoApp'));

  beforeEach(inject(function($controller, $rootScope, $q) {
    mockFileSystemService = {
      getFileList: function(fileRoot){
        fileDeferred = $q.defer();
        return fileDeferred.promise;
      }
    };
    spyOn(mockFileSystemService,'getFileList').and.callThrough();

    scope = $rootScope.$new();
    //q = $q;
    projectDialogCtrl = $controller('projectDialogController', {
      $scope: scope,
      FileSystemService: mockFileSystemService//,
      //ProjectService: mockProjectService
    });
  }));

  //validate controller
  it('projectDialogController should be declared', function() {
    expect(projectDialogCtrl).toBeDefined();
  });

  describe('init function', function(){
    //validate newProjectClick()
    it('should be added to scope', function() {
      expect(scope.init).toBeDefined();
    });

    describe('will call getFileList',function(){

      beforeEach(function(){
        fileDeferred.resolve(fileTree);
        scope.$root.$digest();
      });

      it('should call getFileList function with correct parameter', function() {
        expect(mockFileSystemService.getFileList).toHaveBeenCalled();
        expect(scope.model).toBeTruthy();
      });
//      it('should call add project to application server', function(){
//        projectDeferred.resolve(projectGoodResult);
//        scope.$root.$digest();
//        expect(mockProjectService.addProject).toHaveBeenCalled();
//      });
//      it('should call open project when add succeeds', function(){
//        projectDeferred.resolve(projectGoodResult);
//        scope.$root.$digest();
//        projectDeferred.resolve(projectWithTree);
//        scope.$root.$digest();
//        expect(mockProjectService.openProject).toHaveBeenCalled();
//        expect(mockProjectService.openProject).toHaveBeenCalledWith(projectData);
//        expect(scope.project.tree.name).toEqual('rootNode');
//      });
    });
  });

});

