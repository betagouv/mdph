'use strict';

import _ from 'lodash';
import Mdph from '../mdph/mdph.model';
import Request from '../request/request.model';
import User from '../user/user.model';
import moment from 'moment';
import Promise from 'bluebird';
import { computeDuration, computeHumanMedianTime, computeMedianTimes, computeAverageTimes, getStartDate, getMomentFormat } from './utils';

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

export function createdRequestCount(req, res) {
  Request
    .find({
      createdAt: {
        $gte: getStartDate(req.query.period)
      },
      status: 'en_cours',
    })
    .count()
    .exec()
    .then(result => res.json(result));
}

export function submittedRequestCount(req, res) {
  Request
    .find({
      createdAt: {
        $gte: getStartDate(req.query.period)
      },
      status: {
        $in: ['emise', 'validee', 'en_attente_usager', 'archive']
      },
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

export function requestCountByMdph(req, res) {
  return Request.aggregate([
    {
      $match: {
        createdAt: {
          $gte: getStartDate(req.query.period)
        },
        mdph: { $in: officialMdphs },
        status: {
          $in: ['emise', 'validee', 'en_attente_usager', 'archive']
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

export function requestMedianTime(req, res) {
  Request
    .find({
      status: {$ne: 'en_cours'},
      submittedAt: {$gte: getStartDate(req.query.period)},
    })
    .then(computeHumanMedianTime)
    .then(result => res.json(result));
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

export function requestRawData(req, res) {
  const period = req.query.period;
  const filter = req.query.filter || 60;

  Request
    .find({
      mdph: { $in: officialMdphs },
      status: {$ne: 'en_cours'},
      submittedAt: {$gte: getStartDate(period)},
    })
    .then(requests => {
      const withDurations = requests.map(request => ({submittedAt: request.submittedAt, duration: moment.duration(computeDuration(request)).asMinutes()}));
      const sortedByDuration = withDurations.sort((a, b) => a.duration - b.duration);
      const filteredByDuration = sortedByDuration.splice(0, Math.round(sortedByDuration.length * filter / 100));

      let total = 0;
      const reduced = filteredByDuration.reduce((acc, request) => {
        return acc.concat({
          x: request.duration,
          y: ++total / filteredByDuration.length * 100,
          r: 5,
        });
      }, []);

      res.json(reduced);
    });
}

export function requestAnalysis(req, res) {
  const period = req.query.period;

  groupRequestByPeriod({
    submittedAt: {$gte: getStartDate(period)},
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
