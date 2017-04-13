import pa11y from 'pa11y';

var cliReporter = require('pa11y/reporter/cli');

const processResults = (results, url, onlyErrors) => {
  if (onlyErrors) {
    const errorResults = results.filter(result => {
      return result.type === 'error';
    });

    cliReporter.results(errorResults, url);
    return errorResults;
  }

  cliReporter.results(results, url);
  return results;
}

export default function({ url, onlyErrors }, callback) {
  const runner = pa11y();

  runner.run(url, (err, results) => {
    if (err) {
      return callback(err);
    }

    const processedResults = processResults(results, url, onlyErrors);

    return callback(processedResults);
  });
}
