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
    document_removed: {
      fa: 'trash'
    },
    update_answers: {
      fa: 'edit'
    },
    assign_sector: {
      fa: 'bullseye'
    },
    change_status: {
      fa: 'folder'
    },
    document_validated: {
      fa: 'thumbs-up'
    },
    document_refused: {
      fa: 'thumbs-down'
    },
    succes_enregistrement: {
      fa: 'save'
    },
    erreur_enregistrement: {
      fa: 'refresh'
    }
  });
