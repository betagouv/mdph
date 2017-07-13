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

const getOneWeekAgo = () => substract(7);
const getOneMonthAgo = () => substract(30);
const getOneYearAgo = () => substract(365);
const officialMdphs =  ['14', '17', '54'];

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
  Request.find({
    createdAt: {$gte: getOneYearAgo()},
    mdph: {$in: officialMdphs},
    status: {$ne: 'en_cours'}
  }).sort('createdAt').exec(function(err, requests) {
    if (err) { return handleError(req, res, err); }

    if (!requests) {
      return res.json({});
    }

    requests.forEach(function(request) {
      request.createdAtByMonth = moment(request.createdAt).format('MMMM YYYY');
    });

    var groupByDate = _.groupBy(requests, 'createdAtByMonth');
    var data = [];
    _.forEach(groupByDate, function(requests, date) {
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
