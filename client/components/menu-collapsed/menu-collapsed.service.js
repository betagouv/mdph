'use strict';

(function() {

  function MenuCollapsed() {
    var isCollapsed = false;

    var MenuCollapsed = {
      toggle() {
        isCollapsed = !isCollapsed;
      },

      isCollapsed() {
        return isCollapsed;
      }
    };

    return MenuCollapsed;
  }

  angular.module('impactApp').factory('MenuCollapsed', MenuCollapsed);
})();
