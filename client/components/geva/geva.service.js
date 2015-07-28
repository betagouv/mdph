'use strict';

angular.module('impactApp')
  .factory('GevaService', function GevaService($http) {
    var sections = [
    {
      id: 'situation',
      label: 'Vie personnelle',
      model: {},
      placement: 'left'
    },
    {
      id: 'environnement',
      label: 'Environnement',
      model: {},
      placement: 'right'
    },
    {
      id: 'aides',
      label: 'Vie scolaire ou professionnelle',
      model: {},
      placement: 'left'
    },
    {
      id: 'besoins',
      label: 'Evolution et besoins',
      model: {},
      placement: 'right'
    }];

    var sectionsByLabel = _.indexBy(sections, 'label');

    var getTooltipBySection = function(section) {
      var tooltip = '<ul>';
      _.forEach(section.questions, function(question) {
        tooltip += '<li>' + question[0].Description + '</li>';
      });

      tooltip += '</ul>';
      return tooltip;
    };

    return {
      getSections: function(request) {
        return $http.get('/api/geva', {cache: true}).then(function(result) {
          var gevaSections = _.groupBy(result.data, 'Section');
          _.forEach(gevaSections, function(questions, section) {
            var trajectoire = {
              travail: [],
              scolaire: []
            };
            var general = [];
            questions.forEach(function(question) {
              if (question.Trajectoire === 'scolaire') {
                trajectoire.scolaire.push(question);
              } else {
                if (question.Trajectoire === 'travail') {
                  trajectoire.travail.push(question);
                } else {
                  general.push(question);
                }
              }
            });

            if (request.formAnswers.vie_scolaire) {
              if (request.formAnswers.vie_au_travail) {
                questions = trajectoire.scolaire.concat(trajectoire.travail, general);
              } else {
                questions = trajectoire.scolaire.concat(general, trajectoire.travail);
              }
            } else {
              if (request.formAnswers.vie_au_travail) {
                questions = trajectoire.travail.concat(trajectoire.scolaire, general);
              } else {
                questions = general.concat(trajectoire.scolaire, trajectoire.travail);
              }
            }

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
