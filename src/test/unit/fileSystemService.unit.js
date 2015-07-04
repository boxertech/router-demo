describe('FileSystemService ', function() {
  var httpBackend;
  var fileSystemService;
  var fileData = {path: 'root',depth: 2};
  var responseGetFileListGood =
  {
    label:'root',
    path: 'root',
    isDirectory: true,
    children:
      [
        {
          label:'c:',
          path: 'c:',
          isDirectory: true,
          children:
            [
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
          children:
            [
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

  beforeEach(inject(function(FileSystemService,$httpBackend,$q) {
    httpBackend = $httpBackend;
    fileSystemService = FileSystemService;
    //modal = $modal;
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('FileSystemService should be declared', function() {
    expect(fileSystemService).toBeDefined();
  });

  describe('getFileList function', function(){
    it('should be added to scope', function() {
      expect(fileSystemService.getFileList).toBeDefined();
    });
    it('should call project API with file root', function(){
      httpBackend.expectGET('api/file/'+fileData.path+'/'+fileData.depth).respond(200,responseGetFileListGood);
      var fileSystemResponse = fileSystemService.getFileList(fileData.path, fileData.depth);
      httpBackend.flush();
    });
    it('should return API response', function(){
      httpBackend.expectGET('api/file/'+fileData.path+'/'+fileData.depth).respond(200,responseGetFileListGood);
      var fileResponse = fileSystemService.getFileList(fileData.path, fileData.depth);
      var result;
      fileResponse.then(function(response){
        result = response;
      });
      httpBackend.flush();
      expect(result).toEqual(responseGetFileListGood);
    });
  });

});

