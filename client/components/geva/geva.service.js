'use strict';

angular.module('impactApp')
  .factory('GevaService', function GevaService($http) {
    return {
      getSections: function() {
        return [{
          id: 'profil',
          label: 'Éléments du profil',
          libelle: 'éléments du profil'
        },
        {
          id: 'environnement',
          label: 'Éléments environnementaux',
          libelle: 'éléments environnementaux'
        },
        {
          id: 'personnel',
          label: 'Éléments personnels',
          libelle: 'éléments personnels'
        },
        {
          id: 'scolaire_professionnel',
          label: 'Éléments scolaires ou professionnels',
          libelle: 'éléments scolaires ou professionnels'
        },
        {
          id: 'evolution_besoins',
          label: 'Évolution et besoins',
          libelle: 'évolution et besoins'
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
              cleanModel[section][trajectoire] = sectionQuestions;
            });
          });

          return cleanModel;
        });
      },

      validate: function(section) {
        section.validated = true;
      }
    };
  });
