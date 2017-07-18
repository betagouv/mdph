'use strict';

import _ from 'lodash';
import Mdph from '../mdph/mdph.model';
import Profile from '../profile/profile.model';
import Request from '../request/request.model';
import User from '../user/user.model';
import moment from 'moment';
import Promise from 'bluebird';
import { computeMedianTimes, computeAverageTimes, getStartDate, getMomentFormat } from './utils';

const officialMdphs =  ['14', '17', '54'];

function groupRequestByPeriod(options, period) {
  return new Promise((resolve, reject) => {
    Request
      .find(options)
      .sort('submittedAt')
      .exec((err, requests) => {
        if (err) reject(err);

        requests.forEach(function(request) {
          request.submittedAtByPeriod = moment(request.submittedAt).format(getMomentFormat(period));
        });

        const groupByDate= _.groupBy(requests, 'submittedAtByPeriod');

        resolve(groupByDate);
      });
    });
}

export function requestCount(req, res) {
  Request
    .find({
      mdph: { $in: officialMdphs },
      createdAt: {
        $gte: getStartDate(req.query.period)
      },
      status: {
        $in: ['emise', 'enregistree', 'en_attente_usager', 'archive']
      }
    })
    .count()
    .exec()
    .then(result => res.json(result));
}

export function mdphs(req, res) {
  Mdph
    .find({
      enabled: true
    })
    .count()
    .exec()
    .then(result => res.json(result));
}

export function profileCount(req, res) {
  Profile
    .find({
      createdAt: {
        $gte: getStartDate(req.query.period)
      }
    })
    .count()
    .exec()
    .then(result => res.json(result));
}

export function requestCountByMdph(req, res) {
  return Request.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getStartDate(req.query.period)
        },
        mdph: { $in: officialMdphs },
        status: {
          $in: ['emise', 'enregistree', 'en_attente_usager', 'archive']
        }
      }
    },
    {
      $group: {
        _id: '$mdph',
        count: {
          $sum: 1
        }
      }
    }
  ])
  .exec((err, result) => res.json(result));
}

export function users(req, res) {
  User
    .aggregate([
      {$match: {role: 'user'}},
      {$group: {_id: '$unconfirmed', count: {$sum: 1} }}
    ])
    .exec(function(err, userGroups) {
      if (err) return handleError(req, res, err);

      return res.send(userGroups);
    });
}

export function requestAnalysis(req, res) {
  const period = req.query.period;

  groupRequestByPeriod({
    createdAt: {$gte: getStartDate(period)},
    status: {$ne: 'en_cours'},
    submittedAt: {$exists: true }
  }, period).then(groupByDate => {
    var data = [];

    _.forEach(groupByDate, (requests, date) => {
      data.push({
        date: date,
        average: computeAverageTimes(requests),
        median: computeMedianTimes(requests),
      });
    });

    res.json(data);
  });
}

export function requestCountHistory(req, res) {
  const period = req.query.period;

  groupRequestByPeriod({
    createdAt: {$gte: getStartDate(period)},
    mdph: {$in: officialMdphs},
    status: {$ne: 'en_cours'}
  }, period).then(groupByDate => {
    var data = [];

    _.forEach(groupByDate, (requests, date) => {
      data.push({
        date: date,
        count: requests.length
      });
    });

    res.json(data);
  });
}

export function likes(req, res) {
  Mdph.find({
    likes: { $exists: true, $ne: [] }
  }).exec(function(err, mdphs) {
    if (err) { return handleError(req, res, err); }

    if (!mdphs) {
      return res.json({});
    }

    var data = [];
    mdphs.forEach(function(element) {
      data.push({
        mdph: element.name,
        count: element.likes.length
      });
    });

    data.sort(function (first, second) {
      return second.count - first.count;
    });

    res.json(data);
  });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
