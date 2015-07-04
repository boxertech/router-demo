/**
 * Created by Ken on 3/16/14.
 */
angular.module('ngRouteDemoApp').directive('beDraggable', function () {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      angular.element(elem).attr('draggable', 'true');

      if (window.jQuery && !window.jQuery.event.props.dataTransfer){
        window.jQuery.event.props.push('dataTransfer');
      }

      //bind dragstart to set object type
      elem.bind('dragstart', function(e){
        if (attrs.elementType === undefined){
          return false;
        }
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('Text',attrs.elementType);
      });

      //bind dragend to reset drag conditions
      elem.bind('dragend', function(e){
        e.dataTransfer.effectAllowed = 'none';
        e.dataTransfer.clearData();
      });

    }
  };
});
