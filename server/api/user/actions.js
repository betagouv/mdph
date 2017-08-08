'use strict';

import { values } from 'lodash';
import UserActionModel from './action.model';

const ACTIONS = {
  USER_CREATION: 'user_creation',
  USER_DELETION: 'user_deletion',
  USER_EDITION: 'user_edition',
};

const ACTIONS_ENUM = values(ACTIONS);

module.exports = {
  ACTIONS,
  ACTIONS_ENUM,
  saveActionLog({ action, user, log, params, mdph }) {
    return UserActionModel.create({
      action,
      params,
      user,
      mdph,
      date: Date.now()
    }, (err, action) => {
      if (err) {
        log.error(err);
      } else {
        log.info(action._doc);
      }
    });
  }
};
