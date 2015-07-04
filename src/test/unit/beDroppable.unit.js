describe('beDroppable directive ', function() {
  var scope = null;
  var element = null;
  var compile = null;

  function buildMockDataTransfer(){
    var fakeDataTransfer = {
      dropEffect: null,
      effectAllowed: null,
      dataObj: {},
      setData: function(format,data){
        this.dataObj[format] = data;
        return;
      },
      getData: function(format){
        return this.dataObj[format];
      },
      clearData: function(){
        this.dataObj = {};
        return;
      }
    };

    return fakeDataTransfer;
  }
  function fakeDragDropEvent(event){
    var fakeDragEvent = new Event(event,true); // jasmine.createSpy('UIEvent');
    fakeDragEvent.dataTransfer = buildMockDataTransfer();
    spyOn(fakeDragEvent,"preventDefault").and.callFake(function(){
      return;
    });
    spyOn(fakeDragEvent,"stopPropagation").and.callFake(function(){
      return;
    });
    return fakeDragEvent;
  }
  function fakeMouseEvent(event){
    var fakeEvent = new Event(event,true); // jasmine.createSpy('UIEvent');
    spyOn(fakeEvent,"preventDefault").and.callFake(function(){
      return;
    });
    spyOn(fakeEvent,"stopPropagation").and.callFake(function(){
      return;
    });
    return fakeEvent;
  }
  function fakeKeyboardEvent(event, code){
    var fakeEvent = $.Event(event);
    fakeEvent.keyCode = code;
    //var fakeEvent = document.createEvent("KeyboardEvent");
    //fakeEvent.initKeyboardEvent("keydown", true, true, window, 0, 0, 0, 0, 0, 46);
    //fakeEvent.initKeyboardEvent("keydown", true, true, null, false, false, false, false, 46, 0);
    //fakeEvent.initKeyboardEvent("keydown", true, true, null, false, 46, false, false, 0);
//    var fakeEvent = new KeyboardEvent(event,{
//      bubbles: true,
//      cancelable: true,
//      shiftKey: false,
//      keyCode: code
//    }); // jasmine.createSpy('UIEvent');
    //fakeEvent.keyCode = 46;
    //fakeEvent.charCode = 46;
    //fakeEvent.which = 46;
    spyOn(fakeEvent,"preventDefault").and.callFake(function(){
      return;
    });
    spyOn(fakeEvent,"stopPropagation").and.callFake(function(){
      return;
    });
    return fakeEvent;
  }

  beforeEach(module('ngRouteDemoApp'));

  describe('drag events', function(){
    beforeEach(inject(function($compile, $rootScope) {
      element = angular.element('<div class="canvas" be-droppable id="be-main-workcanvas" data-drop="dropped"></div>');
      scope = $rootScope;
      //spyOn(angular,"element").andCallThrough();
      compile = $compile;
      compile(element)(scope);
      scope.$digest();
    }));

    it('should set dataTransfer property and dragover class on dragover', function(){
      var fakeEvent = fakeDragDropEvent('dragover');
      element.triggerHandler(fakeEvent);
      expect(fakeEvent.dataTransfer).toBeDefined();
      expect(fakeEvent.dataTransfer.dropEffect).toBeDefined();
      expect(fakeEvent.dataTransfer.dropEffect).toEqual('copy');
      expect(element.hasClass('dragover')).toBe(true);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
    });

    it('should set dataTransfer and dragover class on dragenter', function(){
      var fakeEvent = fakeDragDropEvent('dragenter');
      element.triggerHandler(fakeEvent);
      expect(fakeEvent.dataTransfer).toBeDefined();
      expect(fakeEvent.dataTransfer.dropEffect).toBeDefined();
      expect(fakeEvent.dataTransfer.dropEffect).toEqual('copy');
      expect(element.hasClass('dragover')).toBe(true);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
    });

    it('should clear dragover class on dragleave', function(){
      var fakeEvent = fakeDragDropEvent('dragleave');
      element.triggerHandler(fakeEvent);
      expect(element.hasClass('dragover')).toBe(false);
    });

    it('should add child node on div drop', function(){
      var fakeEvent = fakeDragDropEvent('drop');
      fakeEvent.dataTransfer.setData('Text', 'div');
      var childCount = 0;
      if (element[0].hasChildNodes()){
        childCount = element[0].childElementCount;
      }
      element.triggerHandler(fakeEvent);
      expect(element[0].childElementCount).toEqual(childCount+1);
    });

    it('should add child node on textbox drop', function(){
      var fakeEvent = fakeDragDropEvent('drop');
      fakeEvent.dataTransfer.setData('Text', 'textbox');
      var childCount = 0;
      if (element[0].hasChildNodes()){
        childCount = element[0].childElementCount;
      }
      element.triggerHandler(fakeEvent);
      expect(element[0].childElementCount).toEqual(childCount+1);
    });

    it('should not add child node on other drop', function(){
      var fakeEvent = fakeDragDropEvent('drop');
      fakeEvent.dataTransfer.setData('Text', 'other');
      var childCount = 0;
      if (element[0].hasChildNodes()){
        childCount = element[0].childElementCount;
      }
      element.triggerHandler(fakeEvent);
      expect(element[0].childElementCount).toEqual(childCount);
    });

    it('should clear dragover class on drop', function(){
      var fakeEvent = fakeDragDropEvent('drop');
      element.triggerHandler(fakeEvent);
      expect(element.hasClass('dragover')).toBe(false);
    });

    it('should clear empty class on drop', function(){
      var fakeEvent = fakeDragDropEvent('drop');
      element.triggerHandler(fakeEvent);
      expect(element.hasClass('epmty')).toBe(false);
    });

    it('should prevent bubble on drop', function(){
      var fakeEvent = fakeDragDropEvent('drop');
      element.triggerHandler(fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('mouse events', function(){
    beforeEach(inject(function($compile, $rootScope) {
      element = angular.element('<div class="canvas" be-droppable id="be-main-workcanvas" data-drop="dropped"><div class="workspace" be-droppable id="100"><div class="workspace" be-droppable id="200"></div><div class="workspace" be-droppable id="300"></div></div></div>');
      scope = $rootScope;
      //spyOn(angular,"element").andCallThrough();
      compile = $compile;
      compile(element)(scope);
      scope.$digest();
    }));

    it('should set mouseover class on element when mouseover element and no child with mouseover', function(){
      var fakeEvent = fakeMouseEvent('mouseover');
      var targetElement = element.children()[0];
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should not set mouseover class on element when mouseover element and child with mouseover', function(){
      var fakeEvent = fakeMouseEvent('mouseover');
      var parentElement = element.children()[0];
      var childElement = $(parentElement).children()[0];
      $(childElement).addClass("mouseover");
      $(parentElement).triggerHandler(fakeEvent);
      expect($(parentElement).hasClass('mouseover')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set mouseover class on child when mouseenter child', function(){
      var fakeEvent = fakeMouseEvent('mouseenter');
      var parentElement = element.children()[0];
      var childElement = $(parentElement).children()[0];
      $(childElement).addClass("mouseOver");
      $(childElement).triggerHandler(fakeEvent);
      expect($(childElement).hasClass('mouseover')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set mouseover class on child when mouseenter child', function(){
      var fakeEvent = fakeMouseEvent('mouseenter');
      var parentElement = element.children()[0];
      $(parentElement).addClass("mouseOver");
      var targetElement = $(parentElement).children()[0];
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(true);
      expect($(parentElement).hasClass('mouseover')).toBe(false);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should clear mouseover class child on mouseleave child', function(){
      var fakeLeaveEvent = fakeMouseEvent('mouseleave');
      var fakeOverEvent = fakeMouseEvent('mouseover');
      var parentElement = element.children()[0];
      var targetElement = $(parentElement).children()[0];
      $(targetElement).addClass("mouseOver");
      $(targetElement).triggerHandler(fakeLeaveEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(false);
    });

    it('should clear mouseover class parent on mouseleave parent', function(){
      var fakeEvent = fakeMouseEvent('mouseleave');
      var targetElement = element.children()[0];
      $(targetElement).addClass("mouseOver");
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(false);
    });

    it('should prevent bubble on mouseover', function(){
      var fakeEvent = fakeMouseEvent('mouseover');
      var parentElement = element.children()[0];
      $(parentElement).triggerHandler(fakeEvent);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should prevent bubble on mouseenter', function(){
      var fakeEvent = fakeMouseEvent('mouseenter');
      var parentElement = element.children()[0];
      $(parentElement).triggerHandler(fakeEvent);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should prevent bubble on click', function(){
      var fakeEvent = fakeMouseEvent('click');
      element.triggerHandler(fakeEvent);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set selected class on click', function(){
      var fakeEvent = fakeMouseEvent('click');
      var targetElement = element.children()[0];
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('selected')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set selected class only on clicked element', function(){
      var fakeEvent = fakeMouseEvent('click');
      var parentElement = element.children()[0];
      var childElement = $(parentElement).children()[0];
      $(childElement).addClass("selected");
      $(parentElement).triggerHandler(fakeEvent);
      expect($(parentElement).hasClass('selected')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

  });

  describe('keydown events', function(){
    beforeEach(inject(function($compile, $rootScope) {
      element = angular.element('<div class="canvas" be-droppable id="be-main-workcanvas" data-drop="dropped"><div class="workspace" tabindex="1" be-droppable id="100"><div class="workspace" tabindex="1" be-droppable id="200"></div><div class="workspace" tabindex="1" be-droppable id="300"></div></div></div>');
      scope = $rootScope;
      //spyOn(angular,"element").andCallThrough();
      compile = $compile;
      compile(element)(scope);
      scope.$digest();
    }));

//    it('should remove focused element on DEL keydown and call stopPropagation', function(){
//      var fakeEvent = fakeKeyboardEvent('keydown', 46);
//      element.appendTo(document.body);
//      var targetElement = element.children()[0];
//      //document.render();
//      $(targetElement).focus();
//      //var focusElement = $(targetElement).is(':focus');
//      $(targetElement).triggerHandler(fakeEvent);
//      expect($(targetElement)).toBeUndefined();
//      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
//    });

    it('should not set mouseover class on element when mouseover element and child with mouseover', function(){
      var fakeEvent = fakeMouseEvent('mouseover');
      var parentElement = element.children()[0];
      var childElement = $(parentElement).children()[0];
      $(childElement).addClass("mouseover");
      $(parentElement).triggerHandler(fakeEvent);
      expect($(parentElement).hasClass('mouseover')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set mouseover class on child when mouseenter child', function(){
      var fakeEvent = fakeMouseEvent('mouseenter');
      var parentElement = element.children()[0];
      var childElement = $(parentElement).children()[0];
      $(childElement).addClass("mouseOver");
      $(childElement).triggerHandler(fakeEvent);
      expect($(childElement).hasClass('mouseover')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set mouseover class on child when mouseenter child', function(){
      var fakeEvent = fakeMouseEvent('mouseenter');
      var parentElement = element.children()[0];
      $(parentElement).addClass("mouseOver");
      var targetElement = $(parentElement).children()[0];
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(true);
      expect($(parentElement).hasClass('mouseover')).toBe(false);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should clear mouseover class child on mouseleave child', function(){
      var fakeLeaveEvent = fakeMouseEvent('mouseleave');
      var fakeOverEvent = fakeMouseEvent('mouseover');
      var parentElement = element.children()[0];
      var targetElement = $(parentElement).children()[0];
      $(targetElement).addClass("mouseOver");
      $(targetElement).triggerHandler(fakeLeaveEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(false);
    });

    it('should clear mouseover class parent on mouseleave parent', function(){
      var fakeEvent = fakeMouseEvent('mouseleave');
      var targetElement = element.children()[0];
      $(targetElement).addClass("mouseOver");
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('mouseover')).toBe(false);
    });

    it('should set selected class on click', function(){
      var fakeEvent = fakeMouseEvent('click');
      var targetElement = element.children()[0];
      $(targetElement).triggerHandler(fakeEvent);
      expect($(targetElement).hasClass('selected')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set selected class only on clicked element', function(){
      var fakeEvent = fakeMouseEvent('click');
      var parentElement = element.children()[0];
      var childElement = $(parentElement).children()[0];
      $(childElement).addClass("selected");
      $(parentElement).triggerHandler(fakeEvent);
      //expect($(childElement).hasClass('selected')).toBe(false);
      expect($(parentElement).hasClass('selected')).toBe(true);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should prevent bubble on mouseover', function(){
      var fakeEvent = fakeMouseEvent('mouseover');
      var parentElement = element.children()[0];
      $(parentElement).triggerHandler(fakeEvent);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should prevent bubble on mouseenter', function(){
      var fakeEvent = fakeMouseEvent('mouseenter');
      var parentElement = element.children()[0];
      $(parentElement).triggerHandler(fakeEvent);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should prevent bubble on click', function(){
      var fakeEvent = fakeMouseEvent('click');
      element.triggerHandler(fakeEvent);
      expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    });
  });

});

