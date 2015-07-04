describe('ModalService ', function() {
  var scope;
  var modalService, modal;

  function buildMockModal() {
    // Per http://stackoverflow.com/questions/21214868/angularjs-ui-bootstrap-mocking-modal-in-unit-test
    // When you spy on the $modal.open function in the beforeEach,
    //  spyOn($modal, 'open').andReturn(fakeModal);
    // you need to return a mock of what $modal.open normally returns, not a mock of $modal, which doesn’t include
    // an open function as you laid out in your fakeModal mock. The fake modal must have a result object that contains
    // a then function to store the callbacks (to be called when the OK or Cancel buttons are clicked on). It also
    // needs a close function (simulating an OK button click on the modal) and a dismiss function (simulating a Cancel
    // button click on the modal). The close and dismiss functions call the necessary call back functions when called.
    var fakeModal = {
      result: {
        then: function(confirmCallback, cancelCallback){
          this.confirmCallback = confirmCallback;
          this.cancelCallback = cancelCallback;
        }
      },
      close: function(item){
        this.result.confirmCallback(item);
      },
      dismiss: function(type){
        this.result.cancelCallback(type);
      }
    };

    return fakeModal;
  }

  var customDefaults = {
    modalTestDefault: true,
    templateUrl: '/app/main/test.html'
  };

  beforeEach(module('ngRouteDemoApp'));

  beforeEach(inject(function($modal){
    spyOn($modal,'open').and.returnValue(buildMockModal());
  }));

  beforeEach(inject(function(ModalService, $modal) {
    modalService = ModalService;
    modal = $modal;
  }));

  it('ModalService should be declared', function() {
    expect(modalService).toBeDefined();
  });

  describe('show function', function(){
    it('should be added to scope', function() {
      expect(modalService.show).toBeDefined();
    });
    it('should call $modal.open with default defaults when no defaults passed in', function(){
      modalService.show();
      expect(modal.open).toHaveBeenCalled();
      var testDefaults = modal.open.calls.argsFor(0)[0];
      expect(testDefaults.templateUrl).toEqual('/app/main/modal.html');
    });
    it('should call $modal.open with modified defaults when custom defaults passed in', function(){
      modalService.show(customDefaults);
      expect(modal.open).toHaveBeenCalled();
      var testDefaults = modal.open.calls.argsFor(0)[0];
      expect(testDefaults.templateUrl).toEqual('/app/main/test.html');
    });
    it('should return modal instance', function() {
      var showResults = modalService.show();
      expect(showResults.then).toBeDefined();
    });
  });

  describe('showModal function', function(){
    beforeEach(function(){
      spyOn(modalService, 'show');
    });

    it('should be added to scope', function() {
      expect(modalService.showModal).toBeDefined();
    });
    it('should call show() with static defaults when no defaults passed in', function(){
      modalService.showModal();
      expect(modalService.show).toHaveBeenCalled();
      var testDefaults = modalService.show.calls.argsFor(0)[0];
      expect(testDefaults.backdrop).toEqual('static');
    });
    it('should call show() with static modified defaults when custom defaults passed in', function(){
      modalService.showModal(customDefaults);
      expect(modalService.show).toHaveBeenCalled();
      var testDefaults = modalService.show.calls.argsFor(0)[0];
      expect(testDefaults.templateUrl).toEqual('/app/main/test.html');
      expect(testDefaults.backdrop).toEqual('static');
    });
  });

  describe('projectDialog function', function(){
    beforeEach(function(){
      spyOn(modalService, 'show').and.returnValue(buildMockModal().result);
    });

//    it('should be added to scope', function() {
//      expect(modalService.projectDialog).toBeDefined();
//    });
//    it('should call show() with New Project options when arg is true', function(){
//      modalService.projectDialog(true);
//      expect(modalService.show).toHaveBeenCalled();
//      var testOptions = modalService.show.calls.argsFor(0)[1];
//      expect(testOptions.headerText).toEqual('Create New Project');
//    });
//    it('should call show() with Open Project options when arg is false', function(){
//      modalService.projectDialog(false);
//      expect(modalService.show).toHaveBeenCalled();
//      var testOptions = modalService.show.calls.argsFor(0)[1];
//      expect(testOptions.headerText).toEqual('Open Existing Project');
//    });
  });

});

