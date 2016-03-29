'use strict';

angular.module('impactApp')
  .filter('fullMdphName', function(MdphService) {
    var isWaiting = false;
    var fullMdphList = null;

    function fullMdphName(zipcode) {
      var fullMdphNameValue = '...';

      if (fullMdphList) {
        var fullMdph =  _.find(fullMdphList, {code_departement: zipcode});
        fullMdphNameValue = `${fullMdph.code_departement}, ${fullMdph.nom_du_departement}`;
      } else {
        isWaiting = true;
        MdphService.getFullMdphList()
          .then(list => {
            fullMdphList = list;
            isWaiting = false;
          });
      }

      return fullMdphNameValue;
    }

    fullMdphName.$stateful = true;
    return fullMdphName;
  });
