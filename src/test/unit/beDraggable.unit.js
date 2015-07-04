
describe('beDraggable directive ', function() {
  var scope = null;
  var element = null;
  var transferData = {};

  function fakeDataTransfer(){
    var fakeDataTransfer = jasmine.createSpy('eventDataTransfer');
    var dropSpy = jasmine.createSpy('dropEffect');
    //console.log("dropSpy: "+dropSpy);
    //console.log("jasmine ver.: "+jasmine.getEnv().versionString());
    //console.log("dropSpy.and: "+dropSpy.and);
    fakeDataTransfer.dropEffect = dropSpy.and.callFake(function(){
      return dropEffect;
    });
    fakeDataTransfer.effectAllowed = jasmine.createSpy('effectAllowed').and.callFake(function(){
      return effectAllowed;
    });
    fakeDataTransfer.effectAllowed = jasmine.createSpy('effectAllowed').and.callFake(function(value){
      effectAllowed = value;
      return;
    });
    fakeDataTransfer.setData = jasmine.createSpy('setData').and.callFake(function(format,data){
      transferData[format] = data;
      return;
    });
    fakeDataTransfer.getData = jasmine.createSpy('getData').and.callFake(function(format){
      return transferData[format];
    });
    fakeDataTransfer.clearData = jasmine.createSpy('clearData').and.callFake(function(){
      transferData = {};
      return;
    });

    return fakeDataTransfer;
  }
  function fakeDragStart(){
    var fakeDragStartEvent = new Event('dragstart',true); // jasmine.createSpy('UIEvent');
    fakeDragStartEvent.dataTransfer = fakeDataTransfer();
    return fakeDragStartEvent;
  }
  function fakeDragEnd(){
    var fakeDragEndEvent = new Event('dragend',true); // jasmine.createSpy('UIEvent');
    fakeDragEndEvent.dataTransfer = fakeDataTransfer();
    return fakeDragEndEvent;
  }

  beforeEach(module('ngRouteDemoApp'));

  beforeEach(inject(function($compile, $rootScope) {

    element = angular.element('<div class="toolitem" be-draggable data-element-type="div"><span class="glyphicon glyphicon-plus"></span><span class="tooltext">div</span></div>');
    scope = $rootScope;
    //spyOn(angular,"element").andCallThrough();
    $compile(element)(scope);
    scope.$digest();

//    spyOn(angular,'element').and.callFake(function(){
//      mockElement = jasmine.createSpy('UIElement');
//      mockElement.attr = jasmine.createSpy('attr').and.callFake(function(name, value){
//        if (name === "draggable"){
//          dragAttr = value;
//        }
//        return;
//      });
//      mockElement.attr = jasmine.createSpy('attr').and.callFake(function(name){
//        switch (name){
//          case 'elementType':
//            return elementType;
//            break;
//          case 'draggable':
//            return dragAttr;
//            break;
//          default:
//            return null;
//        }
//      });
//      mockElement.bind = jasmine.createSpy('bind').and.callFake(function(evt, fxn){
//        if (evt === 'dragstart'){
//          dragstartFxn = fxn;
//        }
//      });
//      return mockElement;
//    });

  }));

//  beforeEach(function(){
//    spyOn(element,"bind").andCallThrough();
//  });

  it('should set draggable attribute',function(){
    expect(element.attr('draggable')).toBeDefined();
    expect(element.attr('draggable')).toEqual('true');
  });

//  it('should bind to dragstart',function(){
//    expect(element.bind).toHaveBeenCalled(); //With('dragstart', jasmine.any(Function));
//  });
//
  it('should set dataTransfer property on dragstart', function(){
    var fakeEvent = fakeDragStart();
    element.triggerHandler(fakeEvent);
    expect(fakeEvent.dataTransfer).toBeDefined();
    expect(fakeEvent.dataTransfer.effectAllowed).toBeDefined();
    expect(fakeEvent.dataTransfer.effectAllowed).toEqual('copy');
    expect(fakeEvent.dataTransfer.getData('Text')).toEqual('div');
  });

  it('should clear dataTransfer property on dragend', function(){
    var fakeEvent = fakeDragEnd();
    element.triggerHandler(fakeEvent);
    expect(fakeEvent.dataTransfer).toBeDefined();
    expect(fakeEvent.dataTransfer.effectAllowed).toBeDefined();
    expect(fakeEvent.dataTransfer.effectAllowed).toEqual('none');
    expect(fakeEvent.dataTransfer.getData('Text')).toBeUndefined();
  });

});

//e.dataTransfer.effectAllowed = 'copy';
//e.dataTransfer.setData('Type',$attrs.elementType);

