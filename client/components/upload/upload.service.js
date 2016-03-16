'use strict';

angular.module('impactApp')
  .factory('UploadService', function UploadService(Upload) {
    return {
      upload: function(request, file, documentType) {
        if (!file) {
          return;
        }

        var model;

        if (documentType.mandatory) {
          if (!request.documents.obligatoires) {
            request.documents.obligatoires = {};
          }

          model = request.documents.obligatoires;

        } else {
          if (!request.documents.complementaires) {
            request.documents.complementaires = {};
          }

          model = request.documents.complementaires;
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
          url: 'api/requests/' + request.shortId + '/document',
          method: 'POST',
          data: {
            file: file,
            type: documentType.id
          }
        }).then(function(resp) {
          model[documentType.id].documentList.pop();
          model[documentType.id].documentList.push(resp.data);
        },

        function(resp) {
          console.log('Error status: ' + resp.status);
        },

        function(evt) {
          uploadedFile.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
      }
    };
  });
