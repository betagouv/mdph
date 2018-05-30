'use strict';

angular.module('impactApp')
  .factory('UploadService', function UploadService(Upload, $rootScope, $q) {
    return {
      upload: function(demande, file, documentType) {
        var deferred = $q.defer();

        if (!file) {
          return;
        }

        var model;

        if (documentType.mandatory) {
          if (!demande.data.documents.obligatoires) {
            demande.data.documents.obligatoires = {};
          }

          model = demande.data.documents.obligatoires;

        } else {
          if (!demande.data.documents.complementaires) {
            demande.data.documents.complementaires = {};
          }

          model = demande.data.documents.complementaires;
        }

        if (!model[documentType.id]) {
          model[documentType.id] = {
            documentType: documentType,
            documentList: []
          };
        }

        var uploadedFile = {
          name: file.name,
          progress: 0
        };
        model[documentType.id].documentList.push(uploadedFile);

        Upload.upload({
          url: 'api/requests/' + demande.shortId + '/document',
          method: 'POST',
          data: {
            file: file,
            type: documentType.id
          }
        }).then(function(resp) {
          model[documentType.id].documentList.pop();
          model[documentType.id].documentList.push(resp.data);
          deferred.resolve(resp);
        },

        function() {
          $rootScope.$broadcast('file-upload-error', documentType.id);
          model[documentType.id].documentList.pop(uploadedFile);
        },

        function(evt) {
          uploadedFile.progress = parseInt(100.0 * evt.loaded / evt.total);
        });

        return deferred.promise;
      }
    };
  });
