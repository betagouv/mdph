'use strict';

angular.module('impactApp')
  .filter('historyFilter', function() {
    return function(requests, filter) {
      if (filter) {
        filter = filter.toLowerCase();

        var filteredList = [];
        angular.forEach(requests, function(req) {
          var testId = req.shortId.toLowerCase();
          var testStatus = req.status.toLowerCase();

          if ((moment(req.updatedAt)
                .format('LL')
                .indexOf(filter)) > -1) {
            filteredList.push(req);
          } else if (testId.indexOf(filter) > -1) {
            filteredList.push(req);
          } else if (testStatus.indexOf(filter) > -1) {
            filteredList.push(req);
          }
        });

        return filteredList;
      } else {
        return requests;
      }
    };
  });
