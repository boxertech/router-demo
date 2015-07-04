describe('ProjectService ', function() {
  var httpBackend;
  var projectService;
  var projectData = {name: 'test project',url:'d:unknown'};
  var responseAddGood = {status: true, message: ''};
  var responseOpenGood = {
    status: true,
    message: '',
    name: 'test project',
    path: 'd:unknown',
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

  beforeEach(inject(function(ProjectService,$httpBackend,$q) {
    httpBackend = $httpBackend;
    projectService = ProjectService;
    //modal = $modal;
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('ProjectService should be declared', function() {
    expect(projectService).toBeDefined();
  });

  describe('addProject function', function(){
    it('should be added to scope', function() {
      expect(projectService.addProject).toBeDefined();
    });
    it('should call project API with project', function(){
      httpBackend.expectPOST('api/project',projectData).respond(200,responseAddGood);
      var projectResponse = projectService.addProject(projectData);
      httpBackend.flush();
    });
    it('should return API response', function(){
      httpBackend.expectPOST('api/project',projectData).respond(200,responseAddGood);
      var projectResponse = projectService.addProject(projectData);
      var result;
      projectResponse.then(function(response){
        result = response;
      });
      httpBackend.flush();
      expect(result).toEqual(responseAddGood);
    });
  });

  describe('openProject function', function(){
    beforeEach(function(){
      projectData._id = "1234";
    });

    it('should be added to scope', function() {
      expect(projectService.openProject).toBeDefined();
    });
    it('should call project API with project', function(){
      httpBackend.expectGET('api/project/1234').respond(200,responseOpenGood);
      var projectResponse = projectService.openProject(projectData);
      httpBackend.flush();
    });
    it('should return API response', function(){
      httpBackend.expectGET('api/project/1234').respond(200,responseOpenGood);
      console.log("projectData="+projectData);
      var projectResponse = projectService.openProject(projectData);
      var result;
      projectResponse.then(function(response){
        result = response;
      });
      httpBackend.flush();
      expect(result).toEqual(responseOpenGood);
    });
  });

});

