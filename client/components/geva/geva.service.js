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
          // Generation des ids
          // _.forEach(result.data, function(section) {
          //   section.Reponses.forEach(function(reponse) {
          //     reponse.id = reponse.CodeValeur.replace(/[. ]/g, '_');
          //     if (reponse.Details) {
          //       reponse.Details.forEach(function(detail) {
          //         detail.id = detail.CodeValeur.replace(/[. ]/g, '_');
          //         if (detail.SousDetails) {
          //           detail.SousDetails.forEach(function(sousDetail) {
          //             sousDetail.id = sousDetail.CodeValeur.replace(/[. ]/g, '_');
          //           });
          //         }
          //       });
          //     }
          //   });
          // });

          var sections = _.groupBy(result.data, 'Section');

          var cleanModel = {};
          _.forEach(sections, function(toutesQuestions, section) {
            cleanModel[section] = {};

            var trajectoires = _.groupBy(toutesQuestions, 'Trajectoire');
            _.forEach(trajectoires, function(sectionQuestions, trajectoire) {
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
