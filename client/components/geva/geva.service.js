'use strict';

angular.module('impactApp')
  .factory('GevaService', function GevaService($http) {
    var sections = [
    {
      id: 'situation',
      label: 'Situation',
      model: {}
    },
    {
      id: 'environnement',
      label: 'Environnement',
      model: {}
    },
    {
      id: 'aides',
      label: 'Aides actuelles',
      model: {}
    },
    {
      id: 'besoins',
      label: 'Besoins',
      model: {}
    }];

    var sectionsByLabel = _.indexBy(sections, 'label');

    var getTooltipBySection = function(section) {
      var tooltip = '<ul>';
      _.forEach(section.questions, function(question){
        tooltip += '<li>' + question[0].Description + '</li>';
      });
      tooltip += '</ul>';
      return tooltip;
    };

    return {
      getSections: function() {
        return $http.get('/api/geva', {cache: true}).then(function(result) {
          var gevaSections = _.groupBy(result.data, 'Section');
          _.forEach(gevaSections, function(questions, section) {
            var questionsByDesc = _.groupBy(questions, 'Description');
            sectionsByLabel[section].questions = questionsByDesc;
            sectionsByLabel[section].tooltip = getTooltipBySection(sectionsByLabel[section]);
          });

          return sections;
        });
      },

      validate: function(section) {
        section.validated = true;
      },

      computeCompletion: function() {
        var completion = _.reduce(sections, function(result, section) {
          return result + (section.validated ? 25 : 0);
        }, 0);

        return completion;
      }
    };
});
