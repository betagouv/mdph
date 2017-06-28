import Issue from './issue.model';

export function show(req, res) {
  return Issue
    .find({section: req.params.section})
    .populate('user')
    .exec()
    .then(list => res.json(list))
    .catch(err => res.status(500).send(err.toString()));
}

export function create(req, res) {
  return Issue
    .create(req.body)
    .then(created => res.json(created))
    .catch(err => res.status(500).send(err.toString()));
}
