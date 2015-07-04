/**
 * Created by Ken on 3/16/14.
 */
angular.module('ngRouteDemoApp').directive('beDroppable',function($compile){
  return {
    restrict: 'A',
    scope: {
      drop: '&'
    },
    controller: 'droppableController',
    link: function(scope, elem, attrs, droppableCtrl){
      elem.bind('dragover',function(e){
        e.dataTransfer.dropEffect = 'copy';
        if (e.preventDefault){
          e.preventDefault();
        }

        this.classList.add('dragover');
        //console.log('dragover. classList:'+this.classList);
        return false;
      });

      elem.bind('dragenter',function(e){
        e.dataTransfer.dropEffect = 'copy';
        if (e.preventDefault){
          e.preventDefault();
        }

        this.classList.add('dragover');
        //console.log('dragenter. classList:'+this.classList);
        return false;
      });

      elem.bind('dragleave',function(e){
        this.classList.remove('dragover');
        //console.log('dragleave. classList:'+this.classList);
        return false;
      });

      elem.bind('drop',function(e){
        if (e.preventDefault){
          e.preventDefault();
        }
        if(e.stopPropagation){
          e.stopPropagation();
        }

        this.classList.remove('dragover');
        //console.log('drop. classList:'+this.classList);

        var dragtype = e.dataTransfer.getData('Text');
        if (dragtype === undefined){
          return false;
        }

        var node = null;
        switch(dragtype){
          case 'div':
            node = '<div class="workspace empty" tabindex="1" id="' + Date.now() + '"be-droppable drop="dropped"></div>'
            break;
          case 'textbox':
            node = '<input class="workspace" type="text" />'
            break;
          default:
            //alert('unknown dragtype: '+dragtype);
        }

        var newElem = angular.element(node);
        elem.append(newElem);
        $compile(elem.contents())(scope);
        elem.removeClass('empty');
        scope.$apply();

        return false;
      });
//---------------------------------------------------
      elem.bind('mouseover',function(e){
        if (elem.hasClass("workspace")){
          //console.log('mouseover. id: '+this.id);
          $(".mouseover").removeClass("mouseover");
          this.classList.add('mouseover');

          if(e.stopPropagation){
            e.stopPropagation();
          }
        }
      });

      elem.bind('mouseenter',function(e){
        if (elem.hasClass("workspace")){
          //console.log('mouseenter. id: '+this.id);
          $(".mouseover").removeClass("mouseover");
          this.classList.add('mouseover');

          if(e.stopPropagation){
            e.stopPropagation();
          }
        }
      });

      elem.bind('mouseleave',function(e){
        this.classList.remove('mouseover');
      });
//---------------------------------------------------
      elem.bind('click',function(e){
        if (elem.hasClass("workspace")){
          $(".mouseover").removeClass("mouseover");
          $(".selected").removeClass("selected");
          this.classList.add('selected');
          elem.focus();

          if(e.stopPropagation){
            e.stopPropagation();
          }
        } else if (this.id.indexOf('workcanvas') >= 0){
          $(".selected").removeClass("selected");

          if(e.stopPropagation){
            e.stopPropagation();
          }
        }
      });
//---------------------------------------------------
      elem.bind('keydown',function(e){
        var eventCode = (e.keyCode ? e.keyCode : e.which);
        if (elem.hasClass("workspace")){
          if (eventCode === 46){
            //console.log('elem:focus: '+$(elem[0]).is(":focus")+', elem.id: '+elem[0].id+', doc:focus: '+document.activeElement.id);
            $(":focus").remove();
          }

          if(e.stopPropagation){
            e.stopPropagation();
          }
        }
      });

//      function childHasClass(el, className) {
//        var maxDepth = 5;
//        current = el;
//        while (current.length && maxDepth--) {
//          if (current.hasClass(className)) {
//            return true;
//          }
//          if (current.children.length > 0){
//            for (var i=0; i < current.children.length; i++) {
//              var classFound = childHasClass(current.children(i), className);
//              if (classFound){
//                return classFound;
//              }
//            };
//          }
//        }
//        return false;
//      }


    }
  };
});
