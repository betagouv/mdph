'use strict';

import sections from './sections.json';

export function index(req, res) {
  return res.json(sections);
}
