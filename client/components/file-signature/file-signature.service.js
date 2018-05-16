'use strict';

angular.module('impactApp')
  .factory('FileSignatureService', function FileSignatureService($q) {
    return {
      check: function(file, extentions) {
        var deferred = $q.defer();
        var fileReader = new FileReader();
        fileReader.onloadend = function(e) {
          const MAGIC_NUMBER = { pdf: [{size: 4, number: '25504446'}], png: [{size: 8, number: '89504E47DA1AA'}], jpg: [{size: 4, number: 'FFD8FFE0'}, {size: 4, number: 'FFD8FFE1'}, {size: 4, number: 'FFD8FFE8'}]};
          extentions.forEach(function(extention) {
            MAGIC_NUMBER[extention].forEach(function(magic) {
              var arr = (new Uint8Array(e.target.result)).subarray(0, magic.size);
              var header = '';
              for (var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
              }

              if (header.toLocaleUpperCase() === magic.number) {
                deferred.resolve(true);
              }

            });
          });

          deferred.resolve(false);
        };

        fileReader.readAsArrayBuffer(file);
        return deferred.promise;
      }
    };
  });
