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

    var dispatch = function(questions) {
      var result = {};

      _.forEach(sections, function(section) {
        result[section.id] = [];
      });

      _.map(questions, function(question) {
        var section = _.sample(sections);
        result[section.id].push(question);
      });

      return result;
    };

    return {
      getQuestions: function() {
        return $http.get('/api/geva', {cache: true}).then(function(result) {
          var questionsByDesc = _.groupBy(result.data, 'description');
          return dispatch(questionsByDesc);
        });
      },

      getSections: function() {
        return sections;
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
