'use strict';

var _ = require('lodash');

var actions = {
  CREATION: {
    id: 'creation',
    label: 'Création'
  },
  SUBMIT: {
    id: 'submit',
    label: 'Transmission du dossier'
  },
  DOCUMENT_ADDED: {
    id: 'document_added',
    label: 'Ajout de document'
  },
  UPDATE_ANSWERS: {
    id: 'update_answers',
    label: 'Mise à jour des réponses'
  },
  ASSIGN_SECTOR: {
    id: 'assign_sector',
    label: 'Assignation à un secteur'
  },
  CHANGE_STATUS: {
    id: 'change_status',
    label: 'Changement de banette'
  }
};

var actionsById = _.indexBy(actions, 'id');

module.exports = {
  actions: actions,
  actionsById: actionsById
};
