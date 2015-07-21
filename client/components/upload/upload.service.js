'use strict';

angular.module('impactApp')
  .factory('UploadService', function UploadService(Upload, documentTypes) {
    var documentTypesById = _.indexBy(documentTypes, 'id');

    return {
      upload: function(request, filesVM, file, document) {
        if (!filesVM[document]) {
          filesVM[document] = [];
        }

        var type = filesVM[document];
        var length = type.length;

        Upload.upload({
            url: 'api/requests/' + request.shortId + '/document',
            method: 'POST',
            file: file,
            data: {
              type: document,
              category: documentTypesById[document].category
            }
        })
        .progress(function (evt) {
          if (evt.config.file) {
            type[length] = {
              name: evt.config.file.name,
              progress: parseInt(100.0 * evt.loaded / evt.total)
            };
          }
        })
        .success(function (data) {
          request.documents.push(data);
          type[length] = data;
        });
      }
    };

  });
