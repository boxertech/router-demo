describe('MainController ', function() {
  var scope,
    mainCtrl,
    mockModalService,
    mockProjectService,
    deferred,
    projectDeferred;

  var projectData = {name: 'test project',url:'d:unknown'};
  var projectGoodResult = {status: true, message: ''};
  var projectWithTree = {
    name: 'test project',
    url:'d:unknown',
    tree:{
      name: 'rootNode',
      children:[
        {name: 'node1'},
        {name: 'node2'},
        {name: 'node3'}
      ]
    }
  };

  beforeEach(module('ngRouteDemoApp'));

  beforeEach(inject(function($controller, $rootScope, $q) {
    //mockModalService = jasmine.createSpyObj('modalService',['projectDialog']);
    mockModalService = {
      projectDialog: function(){
        deferred = $q.defer();
        return deferred.promise;
      }
    };
    spyOn(mockModalService,['projectDialog']).and.callThrough();

    mockProjectService = {
      addProject: function(project){
        projectDeferred = $q.defer();
        return projectDeferred.promise;
      },
      openProject: function(){
        projectDeferred = $q.defer();
        return projectDeferred.promise;
      }
    };
    spyOn(mockProjectService,'addProject').and.callThrough();
    spyOn(mockProjectService,'openProject').and.callThrough();

    scope = $rootScope.$new();
    //q = $q;
    mainCtrl = $controller('mainController', {
      $scope: scope,
      ModalService: mockModalService,
      ProjectService: mockProjectService
    });
  }));

  //validate controller
  it('mainController should be declared', function() {
    expect(mainCtrl).toBeDefined();
  });

  describe('newProjectClick function', function(){
    //validate newProjectClick()
//    it('should be added to scope', function() {
//      expect(scope.newProjectClick).toBeDefined();
//    });

    describe('will call newProjectClick',function(){

      beforeEach(function(){
        scope.newProjectClick();
        deferred.resolve(projectData);
        scope.$root.$digest();
      });

//      it('should call projectDialog function with correct parameter', function() {
//        expect(mockModalService.projectDialog).toHaveBeenCalled();
//        expect(scope.project.name).toEqual('test project');
//      });
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

  describe('openProjectClick function', function(){
    //validate openProjectClick();
//    it('openProjectClick function should be added to scope', function() {
//      expect(scope.openProjectClick).toBeDefined();
//    });
//    it('openProjectClick function should call the $modal open', function() {
//      scope.openProjectClick();
//      deferred.resolve(projectData);
//      scope.$root.$digest();
//      expect(mockModalService.projectDialog).toHaveBeenCalled();
//      expect(scope.project.name).toEqual('test project');
//      expect(scope.project.url).toEqual('d:unknown');
//    });
  });

});

