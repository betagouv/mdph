import moment from 'moment';

function computeDuration(request) {
  const start = new Date(request.createdAt).getTime();
  const end = new Date(request.submittedAt).getTime();

  const timeSpent = end - start;

  if (isNaN(timeSpent)) {
    return null;
  }

  return timeSpent;
}

function computeMedian(values) {
  values.sort((a, b) => a - b);
  const lowMiddle = Math.floor((values.length - 1) / 2);
  const highMiddle = Math.ceil((values.length - 1) / 2);
  return (values[lowMiddle] + values[highMiddle]) / 2;
}

function computeMedianTimes(requests) {
  const values = requests
    .map(computeDuration)
    .filter(function(current) {
      return current !== null;
    });

  const median = computeMedian(values);
  const asDays = moment.duration(median).asDays();
  return Math.round(asDays * 100) / 100;
}

function computeHumanMedianTime(requests) {
  const values = requests
    .map(computeDuration)
    .filter(function(current) {
      return current !== null;
    });

  const median = computeMedian(values);
  return moment.duration(median).humanize();
}

function computeAverageTimes(requests) {
  const values = requests
    .map(computeDuration)
    .filter(function(current) {
      return current !== null;
    });

  const sum = values.reduce((previous, current) => current += previous);
  const average = sum / values.length;
  const asDays = moment.duration(average).asDays()
  return Math.round(asDays * 100) / 100;
}

function substract(days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function getStartDate(period) {
  switch (period) {
    case 'week':
      return substract(7);
    case 'month':
      return substract(30);
    case 'year':
      return substract(365);
    default:
      return substract(5000);
  }
}

function getMomentFormat(period) {
  switch (period) {
    case 'week':
      return 'DD MMMM YYYY'
    case 'month':
      return 'DD MMMM YYYY';
    case 'year':
      return 'MMMM YYYY';
    default:
      return 'YYYY';
  }
}

module.exports = {
  computeDuration,
  computeMedianTimes,
  computeAverageTimes,
  getStartDate,
  getMomentFormat,
  computeHumanMedianTime,
};
