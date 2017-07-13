'use strict';

import _ from 'lodash';
import async from 'async';
import Mdph from '../mdph/mdph.model';
import Profile from '../profile/profile.model';
import Request from '../request/request.model';
import User from '../user/user.model';
import moment from 'moment';

function substract(days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

// const getOneWeekAgo = () => substract(7);
const getOneMonthAgo = () => substract(30);
const getOneYearAgo = () => substract(365);
const officialMdphs =  ['14', '17', '54'];

function groupRequestByMonth(options) {
  return new Promise((resolve, reject) => {
    Request
      .find(options)
      .sort('submittedAt')
      .exec((err, requests) => {
        if (err) reject(err);

        requests.forEach(function(request) {
          request.submittedAtByMonth = moment(request.submittedAt).format('MMMM YYYY');
        });

        const groupByDate= _.groupBy(requests, 'submittedAtByMonth');

        resolve(groupByDate);
      });
    });
}

function countRequests(data, mdphs, done) {
  async.eachSeries(mdphs, function(mdph, callback) {
    Request.find({
      createdAt: {
        $gte: getOneMonthAgo()
      },
      mdph: mdph.zipcode,
      status: {$ne: 'en_cours'}
    }, function(err, list) {
      data[mdph.zipcode].requests = {};
      data[mdph.zipcode].requests.total = err || !list ? 0 : list.length;

      var requestByStatus = _.groupBy(list, 'status');
      _.forEach(['emise', 'enregistree', 'en_attente_usager', 'archive'], function(status) {
        var requestsForStatus = requestByStatus[status] ? requestByStatus[status].length : 0;
        data[mdph.zipcode].requests[status] = requestsForStatus;
      });

      callback();
    });
  },

  function(err) {
    if (err) { throw err; }

    return done();
  });
}

export function mdph(req, res) {
  Mdph.find({zipcode: {$in: officialMdphs}}).sort('zipcode').exec(function(err, mdphs) {
    if (err) { return handleError(req, res, err); }

    var data = [];
    mdphs.forEach(function(mdph) {
      data.push({
        name: mdph.name,
        zipcode: mdph.zipcode
      });
    });

    var dataByZipcode = _.indexBy(data, 'zipcode');

    countRequests(dataByZipcode, mdphs, () => res.json(data));
  });
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

function computeTime(request) {
  const start = new Date(request.createdAt).getTime();
  const end = new Date(request.submittedAt).getTime();

  const timeSpent = end - start;

  if (isNaN(timeSpent)) {
    return null;
  }

  return timeSpent;
}

function computeMedian(values) {
  values.sort((a, b) => a - b);
  const lowMiddle = Math.floor((values.length - 1) / 2);
  const highMiddle = Math.ceil((values.length - 1) / 2);
  return (values[lowMiddle] + values[highMiddle]) / 2;
}

function computeMedianTimes(requests) {
  const values = requests
    .map(computeTime)
    .filter(function(current) {
      return current !== null;
    });

  const median = computeMedian(values);
  const asDays = moment.duration(median).asDays()
  return Math.round(asDays * 100) / 100;
}

function computeAverageTimes(requests) {
  const values = requests
    .map(computeTime)
    .filter(function(current) {
      return current !== null;
    });

  const sum = values.reduce((previous, current) => current += previous);
  const average = sum / values.length;
  const asDays = moment.duration(average).asDays()
  return Math.round(asDays * 100) / 100;
}

export function time(req, res) {
  groupRequestByMonth({
    createdAt: {$gte: getOneYearAgo()},
    status: {$ne: 'en_cours'},
    submittedAt: {$exists: true }
  }).then(groupByDate => {
    var data = [];

    _.forEach(groupByDate, (requests, date) => {
      data.push({
        date: date,
        average: computeAverageTimes(requests),
        median: computeMedianTimes(requests),
      });
    });

    res.json(data);
  }).catch(err => {
    return handleError(req, res, err);
  });
}

export function site(req, res) {
  Profile
    .find({
      createdAt: {
        $gte: getOneMonthAgo()
      }
    })
    .exec(function(err, profile) {
      if (err) { return handleError(req, res, err); }

      var data = {
        count: profile.length
      };

      res.json(data);
    });
}

export function history(req, res) {
  groupRequestByMonth({
    createdAt: {$gte: getOneYearAgo()},
    mdph: {$in: officialMdphs},
    status: {$ne: 'en_cours'}
  }).then(groupByDate => {
    var data = [];

    _.forEach(groupByDate, (requests, date) => {
      data.push({
        date: date,
        count: requests.length
      });
    });

    res.json(data);
  }).catch(err => {
    return handleError(req, res, err);
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
