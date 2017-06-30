import Issue from './issue.model';
import User from '../user/user.model';
import Promise from 'bluebird';

function populateMdphs(issues) {
  return Promise.map(issues, issue => {
    return User
      .populate(issue.user, 'mdph')
      .then(populatedUser => {
        issue.user = populatedUser;
        return issue;
      });
  });
}

export function show(req, res) {
  return Issue
    .find({section: req.params.section})
    .populate('user')
    .exec()
    .then(populateMdphs)
    .then(res.json.bind(res))
    .catch(err => res.status(500).send(err.toString()));
}

export function create(req, res) {
  return Issue
    .create(req.body)
    .then(res.json.bind(res))
    .catch(err => res.status(500).send(err.toString()));
}

export function toggle(req, res) {
  return Issue
    .findById(req.params.id)
    .then(found => {
      if (!found) {
        return res.status(404).send();
      }

      found.closed = !found.closed;
      return found.save().then(saved => {
        return res.json(saved);
      });
    })
    .catch(err => res.status(500).send(err.toString()));
}
