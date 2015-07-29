'use strict';

angular.module('impactApp')
  .factory('GevaService', function GevaService($http) {
    return {
      getSections: function() {
        return [{
          id: 'situation',
          label: 'Vie personnelle'
        },
        {
          id: 'environnement',
          label: 'Environnement'
        },
        {
          id: 'aides',
          label: 'Vie scolaire ou professionnelle'
        },
        {
          id: 'besoins',
          label: 'Evolution et besoins'
        }];
      },

      getModel: function() {
        return $http.get('/api/geva', {cache: true}).then(function(result) {
          var sections = _.groupBy(result.data, 'Section');

          var cleanModel = {};
          _.forEach(sections, function(toutesQuestions, section) {
            cleanModel[section] = {};

            var trajectoires = _.groupBy(toutesQuestions, 'Trajectoire');
            _.forEach(trajectoires, function(sectionQuestions, trajectoire) {
              //var questionsByDesc = _.groupBy(sectionQuestions, 'Description');
              cleanModel[section][trajectoire] = sectionQuestions;
            });
          });

          return cleanModel;
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
