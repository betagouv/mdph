'use strict';

import _ from 'lodash';
import async from 'async';
import Mdph from '../mdph/mdph.model';
import User from '../user/user.model';
import Request from '../request/request.model';
import moment from 'moment';

const officialMdphs =  ['14', '17', '54'];

function countAgents(data, mdphs, done) {
  async.eachSeries(mdphs, function(mdph, callback) {
    User.find({
      mdph: mdph._id
    },
    function(err, list) {
      data[mdph.zipcode].agents = err || !list ? 0 : list.length;
      callback();
    });
  },

  function(err) {
    if (err) { throw err; }

    return done();
  });
}

function countRequests(data, mdphs, done) {
  async.eachSeries(mdphs, function(mdph, callback) {
    Request.find({
      mdph: mdph.zipcode
    }, function(err, list) {
      data[mdph.zipcode].requests = {};
      data[mdph.zipcode].requests.total = err || !list ? 0 : list.length;

      var requestByStatus = _.groupBy(list, 'status');
      _.forEach(['en_cours', 'emise', 'enregistree', 'en_attente_usager', 'archive'], function(status) {
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

    async.parallel([
      function(cb) {
        countAgents(dataByZipcode, mdphs, cb);
      },

      function(cb) {
        countRequests(dataByZipcode, mdphs, cb);
      }

    ], function(err) {
      res.json(data);
    });
  });
}

export function site(req, res) {
  User.find().exec(function(err, users) {
    if (err) { return handleError(req, res, err); }

    var data = {
      count: users.length
    };

    res.json(data);
  });
}

function getOneWeekAgo() {
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return oneWeekAgo;
}

export function history(req, res) {
  Request.find({
    createdAt: {$gte: getOneWeekAgo()},
    mdph: {$in: officialMdphs}
  }).sort('createdAt').exec(function(err, requests) {
    if (err) { return handleError(req, res, err); }

    if (!requests) {
      return res.json({});
    }

    requests.forEach(function(request) {
      request.createdAtByDay = moment(request.createdAt).format('DD/MM/YYYY');
    });

    var groupByDate = _.groupBy(requests, 'createdAtByDay');
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

export function certificats(req, res) {
  Request.find({mdph: {$in: officialMdphs}}).exec(function(err, requests) {
    if (err) { return handleError(req, res, err); }

    if (!requests) {
      return res.json({});
    }

    var data = 0;
    requests.forEach(function(request) {
      if (request.documents && request.documents.length > 0) {
        request.documents.forEach(function(doc) {
          if (doc.type === 'certificatMedical') {
            data += 1;
          }
        });
      }
    });

    res.json(data);
  });
}

function handleError(req, res, err) {
  req.log.error(err);
  return res.status(500).send(err);
}
