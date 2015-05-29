var _ = require('lodash');

exports.ou = _.some;
exports.et = _.every;

exports.getSection = function(answers, sectionModel) {
  var result = _.result(answers, sectionModel);
  return result ? result : {};
}

exports.getValue = function(question, answerModel) {
  var answer = _.result(question, answerModel);
  return answer ? answer : false;
}

exports.getValueList = function(question, answerModelList) {
  var resultList = [];
  _.forEach(answerModelList, function(model) {
    var answer = _.result(question, model);
    if (answer) {
      resultList.push(answer);
    } else {
      resultList.push(false);
    }
  });
  return resultList;
}
