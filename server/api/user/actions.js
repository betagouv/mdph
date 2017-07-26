'use strict';

import { values } from 'lodash';
import UserActionModel from './action.model';

const ACTIONS = {
  CREATE: 'create',
  DELETE: 'delete',
  CHANGE_INFO: 'change_info',
};

const ACTIONS_ENUM = values(ACTIONS);

module.exports = {
  ACTIONS,
  ACTIONS_ENUM,
  saveActionLog({ action, user, log, params }) {
    return UserActionModel.create({
      action,
      params,
      user,
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
