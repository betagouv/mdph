'use strict';

import { values } from 'lodash';

const ACTIONS = {
  CREATION: 'creation',
  SUBMIT: 'submit',
  DOCUMENT_ADDED: 'document_added',
  DOCUMENT_REMOVED: 'document_removed',
  DOCUMENT_VALIDATED: 'document_validated',
  DOCUMENT_REFUSED: 'document_refused',
  UPDATE_DATA: 'update_data',
  ASSIGN_EVALUATORS: 'assign_evaluators',
  CHANGE_STATUS: 'change_status',
  ENREGISTREMENT: 'enregistrement',
};

const ACTIONS_ENUM = values(ACTIONS);

module.exports = {
  ACTIONS,
  ACTIONS_ENUM,
};
