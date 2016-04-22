'use strict';

import _ from 'lodash';
import questions from './questions.json';

export function index(req, res) {
  return res.json(questions);
}
