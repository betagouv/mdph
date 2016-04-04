'use strict';

angular.module('impactApp')
  .directive('historySynthese', function() {
    return {
      scope: {
        listSyntheses: '=',
        currentSynthese: '=',
        sectionId: '='
      },
      templateUrl: 'components/history-synthese/history-synthese.html'
    };
  });
