'use strict';

angular.module('impactApp')
  .factory('PreparationEvaluationService', function PreparationEvaluationService (DocumentsPreparationEvalConstants) {
    var flattenAnswers = function(answers){
      var flattened = [];
      _.forEach(answers, function(answer){
        if (typeof answer === 'object') {
          _.forEach(answer, function(n, key){
            if (n) {
              flattened.push(key);
            }
          });
        }
        else {
          flattened.push(answer);
        }
      });
      return flattened;
    };

    var compareAnswersAndDocs = function (answers) {
      var docsList = [];
      _.forEach(DocumentsPreparationEvalConstants, function(document){
        _.forEach(document.situations, function(situation){
          if (_.intersection(answers, situation).length === situation.length && _.last(docsList) !== document){
            docsList.push(document);
          }
        });
      });
      return docsList;
    };

    return {
      getDocsList: function(answers){
        var flattenedAnswers = flattenAnswers(answers);
        return compareAnswersAndDocs(flattenedAnswers);
      }
    };
  });
