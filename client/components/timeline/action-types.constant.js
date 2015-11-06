'use strict';

angular.module('impactApp')
  .constant('actionTypes', {
    creation: {
      fa: 'plus'
    },
    submit: {
      fa: 'send'
    },
    document_added: {
      fa: 'upload'
    },
    update_answers: {
      fa: 'edit'
    },
    assign_sector: {
      fa: 'bullseye'
    },
    change_status: {
      fa: 'folder'
    }
  });
